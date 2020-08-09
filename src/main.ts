import { Level } from './Level'
import { GameEvent } from './GameEvent'
import { Player } from './Player'
import { GameEventHandler } from './GameEventHandler'

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
        return 1 - (player.itemList.length / player.maxNumOfItems);
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

var numOfStages: number = 2;
var gameEventPoolsList: Array<Array<GameEvent>>;
var level: Level = new Level(0, 0);
var player: Player;
var gameEventHandler: GameEventHandler = new GameEventHandler();

gameEventPoolsList = []
for (let i = 0; i < numOfStages; i++) {
    gameEventPoolsList.push(Array<GameEvent>());
    switch (i) {
        case 0: {
            gameEventPoolsList[i].push(new BuffGameEvent("buff", 0))
            gameEventPoolsList[i].push(new NewItemGameEvent("newItem", 1))
            gameEventPoolsList[i].push(new ShoppingGameEvent("shop", 2))
            break;
        }
        case 1: {
            gameEventPoolsList[i].push(new BuffGameEvent("buff", 0))
            gameEventPoolsList[i].push(new NewItemGameEvent("newItem", 1))
            gameEventPoolsList[i].push(new ShoppingGameEvent("shop", 2))
            gameEventPoolsList[i].push(new StoryTellingGameEvent("story", 3))
            break;
        }
    }
}

document.getElementById("enter-button").addEventListener("click", formPlayer);
function formPlayer(): void {
    let hp: number = (document.getElementById("hp-input") as HTMLInputElement).valueAsNumber;
    let def: number = (document.getElementById("def-input") as HTMLInputElement).valueAsNumber;
    let atk: number = (document.getElementById("atk-input") as HTMLInputElement).valueAsNumber;
    let lux: number = (document.getElementById("lux-input") as HTMLInputElement).valueAsNumber;
    player = new Player(hp, atk, def, lux)
}
document.getElementById("request-button").addEventListener("click", requestForGameEvent);
function requestForGameEvent(): void {
    let epi = gameEventHandler.handleRequestForGameEvent(player, level, gameEventPoolsList);
    console.log(epi.output());
}


