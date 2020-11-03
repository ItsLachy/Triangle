import Discord from 'discord.js';
import CommandOptions from '../interfaces/CommandOptions';

export default abstract class TriangleCommand {
    private readonly name: string;
    private readonly description: string;
    private readonly options: CommandOptions | undefined;

    protected constructor(name: string, description: string, options?: CommandOptions) {
        this.name = name;
        this.description = description;
        this.options = options;
    }

    abstract execute(message: Discord.Message, args: string[]): Promise<void>;

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getAliases(): string[] {
        return this.options?.aliases || [];
    }
}
