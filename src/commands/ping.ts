import { Message } from 'discord.js';
import TriangleCommand from '../lib/TriangleCommand';

class PingCommand extends TriangleCommand {
    constructor() {
        super('ping', 'Pong!');
    }

    async execute(message: Message): Promise<void> {
        await message.channel.send(`Pong! Response time is \`${Math.floor(message.client.ws.ping)}ms\`.`);
    }
}

export default PingCommand;
