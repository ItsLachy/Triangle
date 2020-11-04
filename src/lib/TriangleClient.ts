import Discord from 'discord.js';
import Bunyan from 'bunyan';
import { readdirSync } from 'fs';
import TriangleCommand from './TriangleCommand';
import * as Sentry from '@sentry/node';
import rString from 'crypto-random-string';

const log = Bunyan.createLogger({ name: 'Triangle' });

export class TriangleClient extends Discord.Client {
    private commands: Discord.Collection<string, TriangleCommand>;
    private readonly prefix: string;
    constructor() {
        super();
        this.commands = new Discord.Collection();

        if (!process.env.PREFIX)
            throw new Error('The environment variable "PREFIX" is required however a value was not found.');

        if (!process.env.SUPPORT_INVITE)
            throw new Error('The environment variable "SUPPORT_INVITE" is required however a value was not found.');

        this.prefix = process.env.PREFIX;

        this.initCommandHandler();

        this.on('message', async (message: Discord.Message) => {
            if (!message.content.startsWith(this.prefix) || message.author.bot) return;

            const args: string[] = message.content.slice(this.prefix.length).trim().split(/ +/);
            const commandName: string = args.shift()!.toLowerCase();

            const command: TriangleCommand | undefined =
                this.commands.get(commandName) || this.commands.find((cmd) => cmd.getAliases().includes(commandName));

            try {
                await command!.execute(message, args);
                log.info(`${message.author.tag} (${message.author.id}) Command Executed -> ${commandName} [${args}]`);
            } catch (err) {
                const errorId: string = rString({ length: 12, type: 'base64' });
                Sentry.withScope((scope) => {
                    scope.setTag('guild', message.guild!.id);
                    scope.setTag('command', commandName);
                    scope.setTag('errorId', errorId);
                    scope.setUser({ id: message.author.id, username: message.author.tag });
                    Sentry.captureException(err);
                });

                log.warn(
                    `${message.author.tag} (${message.author.id}) Command Execute Failed -> ${commandName} [${args}]`,
                );

                if (!process.env.PRODUCTION) console.error(err);

                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle('An error occured!')
                    .setDescription(`If this continues please, [report it](${process.env.SUPPORT_INVITE}).`)
                    .setFooter(`Error ID: ${errorId}`);
                message.channel.send(embed);
            }
        });

        this.on('ready', () => log.info(`Connected to Discord as ${this.user?.tag}`));
    }

    private initCommandHandler() {
        const commandFiles: string[] = readdirSync(__dirname + '/../commands').filter((f) => f.endsWith('.js'));

        for (const file of commandFiles) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { default: commandFile } = require(`../commands/${file}`);
            const command: TriangleCommand = new commandFile();

            this.commands.set(command.getName(), command);
        }
    }
}
