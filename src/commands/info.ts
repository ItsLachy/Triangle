import { Client, Message, MessageEmbed } from 'discord.js';
import TriangleCommand from '../lib/TriangleCommand';

class InfoCommand extends TriangleCommand {
    constructor() {
        super('info', 'Get information on the bot.', { aliases: ['information', 'about'] });
    }

    async execute(message: Message): Promise<void> {
        const client: Client = message.client;
        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor(client.user!.username, String(client.user!.avatarURL()))
            .addField('Version', process.env.npm_package_version, true)
            .addField('Source Code', '[GitHub](https://github.com/Triangle-Project)', true)
            .addField('Creator', 'Eton#4446', true)
            .addField('Servers', client.guilds.cache.size, true)
            .addField('Users', client.users.cache.size, true)
            .addField('Invite', '');
        await message.channel.send(embed);
    }
}

export default InfoCommand;
