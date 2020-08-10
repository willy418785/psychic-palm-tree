import { View } from "./view";
import { Level } from "./Level";
import { Player } from "./Player";
import { GameEventHandler } from "./GameEventHandler";
import { GameEvent } from "./GameEvent";
import {
  BuffGameEvent,
  NewItemGameEvent,
  StoryTellingGameEvent,
  ShoppingGameEvent,
} from "./GameEvents";

export class Presenter {
  view: View;
  player: Player;
  epi: GameEvent;
  gameEventHandler: GameEventHandler;
  gameEventPoolsList: Array<Array<GameEvent>>;
  level: Level;
  constructor() {
    var numOfStages: number = 2;
    this.level = new Level(0, 0);
    this.gameEventHandler = new GameEventHandler();

    this.gameEventPoolsList = [];
    for (let i = 0; i < numOfStages; i++) {
      this.gameEventPoolsList.push(Array<GameEvent>());
      switch (i) {
        case 0: {
          this.gameEventPoolsList[i].push(new BuffGameEvent("buff", 0));
          this.gameEventPoolsList[i].push(new NewItemGameEvent("newItem", 1));
          this.gameEventPoolsList[i].push(new ShoppingGameEvent("shop", 2));
          break;
        }
        case 1: {
          this.gameEventPoolsList[i].push(new BuffGameEvent("buff", 0));
          this.gameEventPoolsList[i].push(new NewItemGameEvent("newItem", 1));
          this.gameEventPoolsList[i].push(new ShoppingGameEvent("shop", 2));
          this.gameEventPoolsList[i].push(new StoryTellingGameEvent("story", 3));
          break;
        }
      }
    }
    this.view = new View(this);
  }

  UserInput(start, end): never {
    throw new Error("not Implemented");
  }

  formPlayer() {
    let hp: number = (document.getElementById("hp-input") as HTMLInputElement).valueAsNumber;
    let def: number = (document.getElementById("def-input") as HTMLInputElement).valueAsNumber;
    let atk: number = (document.getElementById("atk-input") as HTMLInputElement).valueAsNumber;
    let lux: number = (document.getElementById("lux-input") as HTMLInputElement).valueAsNumber;

    this.player = new Player(hp, atk, def, lux);

    this.epi = this.gameEventHandler.handleRequestForGameEvent(
      this.player,
      this.level,
      this.gameEventPoolsList
    );
  }

  requestForGameEvent() {
    console.log(this.epi.output());
  }
}
