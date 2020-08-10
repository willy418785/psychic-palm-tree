import { Level } from './Level'
import { Player } from './Player'

export abstract class GameEvent {
    name: string;
    type: number;
    constructor(name: string, type: number) {
        this.name = name;
        this.type = type;
    }
    public abstract evaluate(player: Player, level: Level): number;
    public output(): string {
        return this.name
    }
}