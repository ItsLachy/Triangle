import { Guild, GuildChannel, GuildMember, Message, MessageEmbed, Role } from 'discord.js';
import ms from 'ms';
import TriangleCommand from '../lib/TriangleCommand';

class MuteCommand extends TriangleCommand {
    constructor() {
        super('mute', 'Mute the specified user for the specified duration.');
    }

    async execute(message: Message, args: string[]): Promise<void> {
        if (message.member?.permissions.has('MANAGE_MESSAGES'));

        if (!message.mentions.members!.first() || !args[1]) {
            message.reply('invalid usage. The proper usage would be `t!mute [@user] [Duration]`');
            return Promise.resolve();
        }

        let mutedRole: Role | undefined = message.guild!.roles.cache.find((r) => r.name == 'Muted');

        if (!mutedRole) mutedRole = await createMutedRole(message.guild);

        const user: GuildMember | undefined = message.mentions.members!.first();
        const duration: number = ms(args[1]);

        if (user!.roles.cache.has(mutedRole.id)) {
            await message.reply('that user is already muted.');
            return Promise.resolve();
        }

        if (duration < 60000) {
            await message.channel.send('you must mute a user for at least 1 minute.');
            return Promise.resolve();
        }

        await user!.roles.add(mutedRole);

        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor(user!.user.username, String(user!.user.avatarURL()))
            .setDescription(`${user!.user} has been muted for ${ms(duration, { long: true })}.`);

        await message.channel.send(embed);

        setTimeout(() => {
            user!.roles.remove(mutedRole!.id);
        }, duration);
    }
}

const createMutedRole = async (guild: Guild | null) => {
    const role = await guild!.roles.create({
        data: {
            name: 'Muted',
            permissions: 0,
            position: guild!.me!.roles.highest.position,
        },
        reason: 'Triangle automatic muted role creation',
    });

    await guild!.channels.cache
        .filter((t) => t.type == 'text')
        .forEach((channel: GuildChannel) => {
            channel.updateOverwrite(role, { SEND_MESSAGES: false });
        });

    return role;
};

export default MuteCommand;
