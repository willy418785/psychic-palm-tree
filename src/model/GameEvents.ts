import { GameEvent } from "./GameEvent";

export {
    BuffGameEvent,
    NewItemGameEvent,
    StoryTellingGameEvent,
    ShoppingGameEvent,
};

class BuffGameEvent extends GameEvent {
    public evaluate(player, level): number {
        let hpRatio = player.hp / player.maxHp;
        let atkRatio = player.atk / player.maxAtk;
        let defRatio = player.def / player.maxDef;
        return 1 - (hpRatio + atkRatio + defRatio) / 3;
    }
}
class NewItemGameEvent extends GameEvent {
    public evaluate(player, level): number {
        return 1 - player.itemList.length / player.maxNumOfItems;
    }
}
class StoryTellingGameEvent extends GameEvent {
    public evaluate(player, level): number {
        return Math.pow(level.progression / 100, 2);
    }
}
class ShoppingGameEvent extends GameEvent {
    public evaluate(player, level): number {
        return player.lux / player.maxLux;
    }
}
