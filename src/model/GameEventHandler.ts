import { Level } from './Level'
import { GameEvent } from './GameEvent'
import { Player } from './Player'

export class GameEventHandler {
    constructor() {

    }
    private selectGameEventPool(level: Level, gameEventPoolList: Array<Array<GameEvent>>): Array<GameEvent> {
        return gameEventPoolList[level.stage]
    }
    private pickGameEvent(player: Player, level: Level, gameEventPool: Array<GameEvent>): GameEvent {
        let scoreList: Array<number> = [];
        gameEventPool.forEach(element => {
            let gameEventScore = element.evaluate(player, level);
            scoreList.push(gameEventScore);
        });
        let possibilityList = scoreList.map(function (value, index) {
            // return Math.exp(value) / scoreList.map( function(y /*value*/){ return Math.exp(y) } ).reduce( function(a,b){ return a+b })
            return value / scoreList.map(function (y /*value*/) { return y }).reduce(function (a, b) { return a + b })
        })
        let randomNum = Math.random();
        let accumlator = 0;
        let idx;
        for (idx = 0; idx < possibilityList.length; idx++) {
            accumlator += possibilityList[idx];
            if (accumlator >= randomNum)
                break;
        }
        return gameEventPool[idx];
    }
    public handleRequestForGameEvent(player: Player, level: Level, gameEventPoolList: Array<Array<GameEvent>>) {
        let gameEventPool = this.selectGameEventPool(level, gameEventPoolList)
        let selectedGameEvent = this.pickGameEvent(player, level, gameEventPool)
        return selectedGameEvent
    }
}