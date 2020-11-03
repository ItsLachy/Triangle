import Discord from 'discord.js';
import Bunyan from 'bunyan';

const log = Bunyan.createLogger({ name: 'Triangle' });

export class TriangleClient extends Discord.Client {
    constructor() {
        super();

        this.on('ready', () => log.info(`Connected to Discord as ${this.user?.tag}`));
    }
}
