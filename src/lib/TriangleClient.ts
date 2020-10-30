import Discord from 'discord.js';
import Bunyan from 'bunyan';

const log = Bunyan.createLogger({ name: 'Triangle' });

export class TriangleClient extends Discord.Client {
    constructor() {
        super();

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.on('ready', () => log.info(`Connected to Discord as ${this.user!.tag}`));
    }
}
