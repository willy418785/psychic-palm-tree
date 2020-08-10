(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameEvent = (function () {
    function GameEvent(name, type) {
        this.name = name;
        this.type = type;
    }
    GameEvent.prototype.output = function () {
        return this.name;
    };
    return GameEvent;
}());
exports.GameEvent = GameEvent;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameEventHandler = (function () {
    function GameEventHandler() {
    }
    GameEventHandler.prototype.selectGameEventPool = function (level, gameEventPoolList) {
        return gameEventPoolList[level.stage];
    };
    GameEventHandler.prototype.pickGameEvent = function (player, level, gameEventPool) {
        var scoreList = [];
        gameEventPool.forEach(function (element) {
            var gameEventScore = element.evaluate(player, level);
            scoreList.push(gameEventScore);
        });
        var possibilityList = scoreList.map(function (value, index) {
            return value / scoreList.map(function (y) { return y; }).reduce(function (a, b) { return a + b; });
        });
        var randomNum = Math.random();
        var accumlator = 0;
        var idx;
        for (idx = 0; idx < possibilityList.length; idx++) {
            accumlator += possibilityList[idx];
            if (accumlator >= randomNum)
                break;
        }
        return gameEventPool[idx];
    };
    GameEventHandler.prototype.handleRequestForGameEvent = function (player, level, gameEventPoolList) {
        var gameEventPool = this.selectGameEventPool(level, gameEventPoolList);
        var selectedGameEvent = this.pickGameEvent(player, level, gameEventPool);
        return selectedGameEvent;
    };
    return GameEventHandler;
}());
exports.GameEventHandler = GameEventHandler;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Level = (function () {
    function Level(stage, substage) {
        this.progression = 0;
        this.stage = stage;
        this.substage = substage;
    }
    return Level;
}());
exports.Level = Level;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = (function () {
    function Player(hp, atk, def, lux) {
        this.maxAtk = 100;
        this.maxDef = 100;
        this.itemList = [];
        this.maxNumOfItems = 5;
        this.money = 0;
        this.maxLux = 100;
        this.hp = hp;
        this.maxHp = hp;
        this.atk = atk;
        this.def = def;
        this.lux = lux;
    }
    return Player;
}());
exports.Player = Player;

},{}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var presenter_1 = require("./presenter");
var presenter = new presenter_1.Presenter();
var Level_1 = require("./Level");
var GameEvent_1 = require("./GameEvent");
var Player_1 = require("./Player");
var GameEventHandler_1 = require("./GameEventHandler");
var BuffGameEvent = (function (_super) {
    __extends(BuffGameEvent, _super);
    function BuffGameEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BuffGameEvent.prototype.evaluate = function (player, level) {
        var hpRatio = player.hp / player.maxHp;
        var atkRatio = player.atk / player.maxAtk;
        var defRatio = player.def / player.maxDef;
        return 1 - (hpRatio + atkRatio + defRatio) / 3;
    };
    return BuffGameEvent;
}(GameEvent_1.GameEvent));
var NewItemGameEvent = (function (_super) {
    __extends(NewItemGameEvent, _super);
    function NewItemGameEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewItemGameEvent.prototype.evaluate = function (player, level) {
        return 1 - (player.itemList.length / player.maxNumOfItems);
    };
    return NewItemGameEvent;
}(GameEvent_1.GameEvent));
var StoryTellingGameEvent = (function (_super) {
    __extends(StoryTellingGameEvent, _super);
    function StoryTellingGameEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StoryTellingGameEvent.prototype.evaluate = function (player, level) {
        return Math.pow(level.progression / 100, 2);
    };
    return StoryTellingGameEvent;
}(GameEvent_1.GameEvent));
var ShoppingGameEvent = (function (_super) {
    __extends(ShoppingGameEvent, _super);
    function ShoppingGameEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShoppingGameEvent.prototype.evaluate = function (player, level) {
        return player.lux / player.maxLux;
    };
    return ShoppingGameEvent;
}(GameEvent_1.GameEvent));
var numOfStages = 2;
var gameEventPoolsList;
var level = new Level_1.Level(0, 0);
var player;
var gameEventHandler = new GameEventHandler_1.GameEventHandler();
gameEventPoolsList = [];
for (var i = 0; i < numOfStages; i++) {
    gameEventPoolsList.push(Array());
    switch (i) {
        case 0: {
            gameEventPoolsList[i].push(new BuffGameEvent("buff", 0));
            gameEventPoolsList[i].push(new NewItemGameEvent("newItem", 1));
            gameEventPoolsList[i].push(new ShoppingGameEvent("shop", 2));
            break;
        }
        case 1: {
            gameEventPoolsList[i].push(new BuffGameEvent("buff", 0));
            gameEventPoolsList[i].push(new NewItemGameEvent("newItem", 1));
            gameEventPoolsList[i].push(new ShoppingGameEvent("shop", 2));
            gameEventPoolsList[i].push(new StoryTellingGameEvent("story", 3));
            break;
        }
    }
}
document.getElementById("enter-button").addEventListener("click", formPlayer);
function formPlayer() {
    var hp = document.getElementById("hp-input").valueAsNumber;
    var def = document.getElementById("def-input").valueAsNumber;
    var atk = document.getElementById("atk-input").valueAsNumber;
    var lux = document.getElementById("lux-input").valueAsNumber;
    player = new Player_1.Player(hp, atk, def, lux);
}
document.getElementById("request-button").addEventListener("click", requestForGameEvent);
function requestForGameEvent() {
    var epi = gameEventHandler.handleRequestForGameEvent(player, level, gameEventPoolsList);
    console.log(epi.output());
}

},{"./GameEvent":1,"./GameEventHandler":2,"./Level":3,"./Player":4,"./presenter":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("./view");
var Presenter = (function () {
    function Presenter() {
        this.view = new view_1.View(this);
    }
    Presenter.prototype.UserInput = function (start, end) {
        throw new Error("not Implemented");
    };
    return Presenter;
}());
exports.Presenter = Presenter;

},{"./view":7}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var View = (function () {
    function View(presenter) {
        this.down_time = 0;
        this.up_time = 0;
        this.presenter = presenter;
        this.init_listener();
    }
    View.prototype.init_listener = function () {
        document.addEventListener("keydown", keydown_event_handler);
        document.addEventListener("keyup", keyup_event_handler);
        var self = this;
        function keydown_event_handler() {
            var now = new Date().getTime();
            if (self.up_time > self.down_time) {
                self.down_time = now;
            }
        }
        function keyup_event_handler() {
            var now = new Date().getTime();
            self.up_time = now;
            self.presenter.UserInput(self.down_time, self.up_time);
        }
    };
    return View;
}());
exports.View = View;

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvR2FtZUV2ZW50LnRzIiwic3JjL0dhbWVFdmVudEhhbmRsZXIudHMiLCJzcmMvTGV2ZWwudHMiLCJzcmMvUGxheWVyLnRzIiwic3JjL21haW4udHMiLCJzcmMvcHJlc2VudGVyLnRzIiwic3JjL3ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0dBO0lBR0ksbUJBQVksSUFBWSxFQUFFLElBQVk7UUFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVNLDBCQUFNLEdBQWI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDcEIsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FYQSxBQVdDLElBQUE7QUFYcUIsOEJBQVM7Ozs7O0FDQy9CO0lBQ0k7SUFFQSxDQUFDO0lBQ08sOENBQW1CLEdBQTNCLFVBQTRCLEtBQVksRUFBRSxpQkFBMEM7UUFDaEYsT0FBTyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDekMsQ0FBQztJQUNPLHdDQUFhLEdBQXJCLFVBQXNCLE1BQWMsRUFBRSxLQUFZLEVBQUUsYUFBK0I7UUFDL0UsSUFBSSxTQUFTLEdBQWtCLEVBQUUsQ0FBQztRQUNsQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztZQUN6QixJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNyRCxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxlQUFlLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssRUFBRSxLQUFLO1lBRXRELE9BQU8sS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQWMsT0FBTyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzlHLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzlCLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLEdBQUcsQ0FBQztRQUNSLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUMvQyxVQUFVLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLElBQUksVUFBVSxJQUFJLFNBQVM7Z0JBQ3ZCLE1BQU07U0FDYjtRQUNELE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDTSxvREFBeUIsR0FBaEMsVUFBaUMsTUFBYyxFQUFFLEtBQVksRUFBRSxpQkFBMEM7UUFDckcsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO1FBQ3RFLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFBO1FBQ3hFLE9BQU8saUJBQWlCLENBQUE7SUFDNUIsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FoQ0EsQUFnQ0MsSUFBQTtBQWhDWSw0Q0FBZ0I7Ozs7O0FDSjdCO0lBSUksZUFBWSxLQUFhLEVBQUUsUUFBZ0I7UUFEM0MsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFFcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDN0IsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQVJBLEFBUUMsSUFBQTtBQVJZLHNCQUFLOzs7OztBQ0FsQjtJQVlJLGdCQUFZLEVBQVUsRUFBRSxHQUFXLEVBQUUsR0FBVyxFQUFFLEdBQVc7UUFSN0QsV0FBTSxHQUFXLEdBQUcsQ0FBQztRQUVyQixXQUFNLEdBQVcsR0FBRyxDQUFDO1FBQ3JCLGFBQVEsR0FBa0IsRUFBRSxDQUFDO1FBQzdCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLFVBQUssR0FBVyxDQUFDLENBQUM7UUFFbEIsV0FBTSxHQUFXLEdBQUcsQ0FBQztRQUVqQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDO0lBQ0wsYUFBQztBQUFELENBbkJBLEFBbUJDLElBQUE7QUFuQlksd0JBQU07Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FuQix5Q0FBd0M7QUFFeEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7QUFDaEMsaUNBQStCO0FBQy9CLHlDQUF1QztBQUN2QyxtQ0FBaUM7QUFDakMsdURBQXFEO0FBRXJEO0lBQTRCLGlDQUFTO0lBQXJDOztJQU9BLENBQUM7SUFOVSxnQ0FBUSxHQUFmLFVBQWdCLE1BQU0sRUFBRSxLQUFLO1FBQ3pCLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN2QyxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDMUMsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FQQSxBQU9DLENBUDJCLHFCQUFTLEdBT3BDO0FBQ0Q7SUFBK0Isb0NBQVM7SUFBeEM7O0lBSUEsQ0FBQztJQUhVLG1DQUFRLEdBQWYsVUFBZ0IsTUFBTSxFQUFFLEtBQUs7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FKQSxBQUlDLENBSjhCLHFCQUFTLEdBSXZDO0FBQ0Q7SUFBb0MseUNBQVM7SUFBN0M7O0lBSUEsQ0FBQztJQUhVLHdDQUFRLEdBQWYsVUFBZ0IsTUFBTSxFQUFFLEtBQUs7UUFDekIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDTCw0QkFBQztBQUFELENBSkEsQUFJQyxDQUptQyxxQkFBUyxHQUk1QztBQUNEO0lBQWdDLHFDQUFTO0lBQXpDOztJQUlBLENBQUM7SUFIVSxvQ0FBUSxHQUFmLFVBQWdCLE1BQU0sRUFBRSxLQUFLO1FBQ3pCLE9BQU8sTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3RDLENBQUM7SUFDTCx3QkFBQztBQUFELENBSkEsQUFJQyxDQUorQixxQkFBUyxHQUl4QztBQUVELElBQUksV0FBVyxHQUFXLENBQUMsQ0FBQztBQUM1QixJQUFJLGtCQUEyQyxDQUFDO0FBQ2hELElBQUksS0FBSyxHQUFVLElBQUksYUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuQyxJQUFJLE1BQWMsQ0FBQztBQUNuQixJQUFJLGdCQUFnQixHQUFxQixJQUFJLG1DQUFnQixFQUFFLENBQUM7QUFFaEUsa0JBQWtCLEdBQUcsRUFBRSxDQUFBO0FBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDbEMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBYSxDQUFDLENBQUM7SUFDNUMsUUFBUSxDQUFDLEVBQUU7UUFDUCxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ0osa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3hELGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzlELGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzVELE1BQU07U0FDVDtRQUNELEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDSixrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDeEQsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDOUQsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDNUQsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQXFCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDakUsTUFBTTtTQUNUO0tBQ0o7Q0FDSjtBQUVELFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzlFLFNBQVMsVUFBVTtJQUNmLElBQUksRUFBRSxHQUFZLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFzQixDQUFDLGFBQWEsQ0FBQztJQUN6RixJQUFJLEdBQUcsR0FBWSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBc0IsQ0FBQyxhQUFhLENBQUM7SUFDM0YsSUFBSSxHQUFHLEdBQVksUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXNCLENBQUMsYUFBYSxDQUFDO0lBQzNGLElBQUksR0FBRyxHQUFZLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFzQixDQUFDLGFBQWEsQ0FBQztJQUMzRixNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDMUMsQ0FBQztBQUNELFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUN6RixTQUFTLG1CQUFtQjtJQUN4QixJQUFJLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDeEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUM5QixDQUFDOzs7OztBQ3RFRCwrQkFBOEI7QUFFOUI7SUFFRTtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDZCQUFTLEdBQVQsVUFBVSxLQUFLLEVBQUUsR0FBRztRQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FUQSxBQVNDLElBQUE7QUFUWSw4QkFBUzs7Ozs7QUNBdEI7SUFJSSxjQUFZLFNBQW9CO1FBSGhDLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBR1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCw0QkFBYSxHQUFiO1FBQ0ksUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQzVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUV4RCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsU0FBUyxxQkFBcUI7WUFDMUIsSUFBSSxHQUFHLEdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUV2QyxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7YUFDeEI7UUFDTCxDQUFDO1FBQ0QsU0FBUyxtQkFBbUI7WUFDeEIsSUFBSSxHQUFHLEdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUVuQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzRCxDQUFDO0lBQ0wsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQTVCQSxBQTRCQyxJQUFBO0FBNUJZLG9CQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgTGV2ZWwgfSBmcm9tICcuL0xldmVsJ1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9QbGF5ZXInXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBHYW1lRXZlbnQge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB0eXBlOiBudW1iZXI7XG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB0eXBlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB9XG4gICAgcHVibGljIGFic3RyYWN0IGV2YWx1YXRlKHBsYXllcjogUGxheWVyLCBsZXZlbDogTGV2ZWwpOiBudW1iZXI7XG4gICAgcHVibGljIG91dHB1dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lXG4gICAgfVxufSIsImltcG9ydCB7IExldmVsIH0gZnJvbSAnLi9MZXZlbCdcbmltcG9ydCB7IEdhbWVFdmVudCB9IGZyb20gJy4vR2FtZUV2ZW50J1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9QbGF5ZXInXG5cbmV4cG9ydCBjbGFzcyBHYW1lRXZlbnRIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cbiAgICBwcml2YXRlIHNlbGVjdEdhbWVFdmVudFBvb2wobGV2ZWw6IExldmVsLCBnYW1lRXZlbnRQb29sTGlzdDogQXJyYXk8QXJyYXk8R2FtZUV2ZW50Pj4pOiBBcnJheTxHYW1lRXZlbnQ+IHtcbiAgICAgICAgcmV0dXJuIGdhbWVFdmVudFBvb2xMaXN0W2xldmVsLnN0YWdlXVxuICAgIH1cbiAgICBwcml2YXRlIHBpY2tHYW1lRXZlbnQocGxheWVyOiBQbGF5ZXIsIGxldmVsOiBMZXZlbCwgZ2FtZUV2ZW50UG9vbDogQXJyYXk8R2FtZUV2ZW50Pik6IEdhbWVFdmVudCB7XG4gICAgICAgIGxldCBzY29yZUxpc3Q6IEFycmF5PG51bWJlcj4gPSBbXTtcbiAgICAgICAgZ2FtZUV2ZW50UG9vbC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgbGV0IGdhbWVFdmVudFNjb3JlID0gZWxlbWVudC5ldmFsdWF0ZShwbGF5ZXIsIGxldmVsKTtcbiAgICAgICAgICAgIHNjb3JlTGlzdC5wdXNoKGdhbWVFdmVudFNjb3JlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBwb3NzaWJpbGl0eUxpc3QgPSBzY29yZUxpc3QubWFwKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIC8vIHJldHVybiBNYXRoLmV4cCh2YWx1ZSkgLyBzY29yZUxpc3QubWFwKCBmdW5jdGlvbih5IC8qdmFsdWUqLyl7IHJldHVybiBNYXRoLmV4cCh5KSB9ICkucmVkdWNlKCBmdW5jdGlvbihhLGIpeyByZXR1cm4gYStiIH0pXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgLyBzY29yZUxpc3QubWFwKGZ1bmN0aW9uICh5IC8qdmFsdWUqLykgeyByZXR1cm4geSB9KS5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgKyBiIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGxldCByYW5kb21OdW0gPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICBsZXQgYWNjdW1sYXRvciA9IDA7XG4gICAgICAgIGxldCBpZHg7XG4gICAgICAgIGZvciAoaWR4ID0gMDsgaWR4IDwgcG9zc2liaWxpdHlMaXN0Lmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIGFjY3VtbGF0b3IgKz0gcG9zc2liaWxpdHlMaXN0W2lkeF07XG4gICAgICAgICAgICBpZiAoYWNjdW1sYXRvciA+PSByYW5kb21OdW0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdhbWVFdmVudFBvb2xbaWR4XTtcbiAgICB9XG4gICAgcHVibGljIGhhbmRsZVJlcXVlc3RGb3JHYW1lRXZlbnQocGxheWVyOiBQbGF5ZXIsIGxldmVsOiBMZXZlbCwgZ2FtZUV2ZW50UG9vbExpc3Q6IEFycmF5PEFycmF5PEdhbWVFdmVudD4+KSB7XG4gICAgICAgIGxldCBnYW1lRXZlbnRQb29sID0gdGhpcy5zZWxlY3RHYW1lRXZlbnRQb29sKGxldmVsLCBnYW1lRXZlbnRQb29sTGlzdClcbiAgICAgICAgbGV0IHNlbGVjdGVkR2FtZUV2ZW50ID0gdGhpcy5waWNrR2FtZUV2ZW50KHBsYXllciwgbGV2ZWwsIGdhbWVFdmVudFBvb2wpXG4gICAgICAgIHJldHVybiBzZWxlY3RlZEdhbWVFdmVudFxuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgTGV2ZWx7XG4gICAgc3RhZ2U6IG51bWJlcjtcbiAgICBzdWJzdGFnZTogbnVtYmVyO1xuICAgIHByb2dyZXNzaW9uOiBudW1iZXIgPSAwO1xuICAgIGNvbnN0cnVjdG9yKHN0YWdlOiBudW1iZXIsIHN1YnN0YWdlOiBudW1iZXIpe1xuICAgICAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XG4gICAgICAgIHRoaXMuc3Vic3RhZ2UgPSBzdWJzdGFnZTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIFBsYXllcntcbiAgICBocDogbnVtYmVyO1xuICAgIG1heEhwOiBudW1iZXI7XG4gICAgYXRrOiBudW1iZXI7XG4gICAgbWF4QXRrOiBudW1iZXIgPSAxMDA7XG4gICAgZGVmOiBudW1iZXI7XG4gICAgbWF4RGVmOiBudW1iZXIgPSAxMDA7XG4gICAgaXRlbUxpc3Q6IEFycmF5PG51bWJlcj4gPSBbXTtcbiAgICBtYXhOdW1PZkl0ZW1zOiBudW1iZXIgPSA1O1xuICAgIG1vbmV5OiBudW1iZXIgPSAwO1xuICAgIGx1eDogbnVtYmVyO1xuICAgIG1heEx1eDogbnVtYmVyID0gMTAwO1xuICAgIGNvbnN0cnVjdG9yKGhwOiBudW1iZXIsIGF0azogbnVtYmVyLCBkZWY6IG51bWJlciwgbHV4OiBudW1iZXIpe1xuICAgICAgICB0aGlzLmhwID0gaHA7XG4gICAgICAgIHRoaXMubWF4SHAgPSBocDtcbiAgICAgICAgdGhpcy5hdGsgPSBhdGs7XG4gICAgICAgIHRoaXMuZGVmID0gZGVmO1xuICAgICAgICB0aGlzLmx1eCA9IGx1eDtcbiAgICB9XG59IiwiaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSBcIi4vcHJlc2VudGVyXCI7XG5cbmxldCBwcmVzZW50ZXIgPSBuZXcgUHJlc2VudGVyKCk7XG5pbXBvcnQgeyBMZXZlbCB9IGZyb20gJy4vTGV2ZWwnXG5pbXBvcnQgeyBHYW1lRXZlbnQgfSBmcm9tICcuL0dhbWVFdmVudCdcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vUGxheWVyJ1xuaW1wb3J0IHsgR2FtZUV2ZW50SGFuZGxlciB9IGZyb20gJy4vR2FtZUV2ZW50SGFuZGxlcidcblxuY2xhc3MgQnVmZkdhbWVFdmVudCBleHRlbmRzIEdhbWVFdmVudCB7XG4gICAgcHVibGljIGV2YWx1YXRlKHBsYXllciwgbGV2ZWwpOiBudW1iZXIge1xuICAgICAgICBsZXQgaHBSYXRpbyA9IHBsYXllci5ocCAvIHBsYXllci5tYXhIcDtcbiAgICAgICAgbGV0IGF0a1JhdGlvID0gcGxheWVyLmF0ayAvIHBsYXllci5tYXhBdGs7XG4gICAgICAgIGxldCBkZWZSYXRpbyA9IHBsYXllci5kZWYgLyBwbGF5ZXIubWF4RGVmO1xuICAgICAgICByZXR1cm4gMSAtIChocFJhdGlvICsgYXRrUmF0aW8gKyBkZWZSYXRpbykgLyAzO1xuICAgIH1cbn1cbmNsYXNzIE5ld0l0ZW1HYW1lRXZlbnQgZXh0ZW5kcyBHYW1lRXZlbnQge1xuICAgIHB1YmxpYyBldmFsdWF0ZShwbGF5ZXIsIGxldmVsKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIDEgLSAocGxheWVyLml0ZW1MaXN0Lmxlbmd0aCAvIHBsYXllci5tYXhOdW1PZkl0ZW1zKTtcbiAgICB9XG59XG5jbGFzcyBTdG9yeVRlbGxpbmdHYW1lRXZlbnQgZXh0ZW5kcyBHYW1lRXZlbnQge1xuICAgIHB1YmxpYyBldmFsdWF0ZShwbGF5ZXIsIGxldmVsKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucG93KGxldmVsLnByb2dyZXNzaW9uIC8gMTAwLCAyKTtcbiAgICB9XG59XG5jbGFzcyBTaG9wcGluZ0dhbWVFdmVudCBleHRlbmRzIEdhbWVFdmVudCB7XG4gICAgcHVibGljIGV2YWx1YXRlKHBsYXllciwgbGV2ZWwpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcGxheWVyLmx1eCAvIHBsYXllci5tYXhMdXg7XG4gICAgfVxufVxuXG52YXIgbnVtT2ZTdGFnZXM6IG51bWJlciA9IDI7XG52YXIgZ2FtZUV2ZW50UG9vbHNMaXN0OiBBcnJheTxBcnJheTxHYW1lRXZlbnQ+PjtcbnZhciBsZXZlbDogTGV2ZWwgPSBuZXcgTGV2ZWwoMCwgMCk7XG52YXIgcGxheWVyOiBQbGF5ZXI7XG52YXIgZ2FtZUV2ZW50SGFuZGxlcjogR2FtZUV2ZW50SGFuZGxlciA9IG5ldyBHYW1lRXZlbnRIYW5kbGVyKCk7XG5cbmdhbWVFdmVudFBvb2xzTGlzdCA9IFtdXG5mb3IgKGxldCBpID0gMDsgaSA8IG51bU9mU3RhZ2VzOyBpKyspIHtcbiAgICBnYW1lRXZlbnRQb29sc0xpc3QucHVzaChBcnJheTxHYW1lRXZlbnQ+KCkpO1xuICAgIHN3aXRjaCAoaSkge1xuICAgICAgICBjYXNlIDA6IHtcbiAgICAgICAgICAgIGdhbWVFdmVudFBvb2xzTGlzdFtpXS5wdXNoKG5ldyBCdWZmR2FtZUV2ZW50KFwiYnVmZlwiLCAwKSlcbiAgICAgICAgICAgIGdhbWVFdmVudFBvb2xzTGlzdFtpXS5wdXNoKG5ldyBOZXdJdGVtR2FtZUV2ZW50KFwibmV3SXRlbVwiLCAxKSlcbiAgICAgICAgICAgIGdhbWVFdmVudFBvb2xzTGlzdFtpXS5wdXNoKG5ldyBTaG9wcGluZ0dhbWVFdmVudChcInNob3BcIiwgMikpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDE6IHtcbiAgICAgICAgICAgIGdhbWVFdmVudFBvb2xzTGlzdFtpXS5wdXNoKG5ldyBCdWZmR2FtZUV2ZW50KFwiYnVmZlwiLCAwKSlcbiAgICAgICAgICAgIGdhbWVFdmVudFBvb2xzTGlzdFtpXS5wdXNoKG5ldyBOZXdJdGVtR2FtZUV2ZW50KFwibmV3SXRlbVwiLCAxKSlcbiAgICAgICAgICAgIGdhbWVFdmVudFBvb2xzTGlzdFtpXS5wdXNoKG5ldyBTaG9wcGluZ0dhbWVFdmVudChcInNob3BcIiwgMikpXG4gICAgICAgICAgICBnYW1lRXZlbnRQb29sc0xpc3RbaV0ucHVzaChuZXcgU3RvcnlUZWxsaW5nR2FtZUV2ZW50KFwic3RvcnlcIiwgMykpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbnRlci1idXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZvcm1QbGF5ZXIpO1xuZnVuY3Rpb24gZm9ybVBsYXllcigpOiB2b2lkIHtcbiAgICBsZXQgaHA6IG51bWJlciA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhwLWlucHV0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlQXNOdW1iZXI7XG4gICAgbGV0IGRlZjogbnVtYmVyID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVmLWlucHV0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlQXNOdW1iZXI7XG4gICAgbGV0IGF0azogbnVtYmVyID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXRrLWlucHV0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlQXNOdW1iZXI7XG4gICAgbGV0IGx1eDogbnVtYmVyID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibHV4LWlucHV0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlQXNOdW1iZXI7XG4gICAgcGxheWVyID0gbmV3IFBsYXllcihocCwgYXRrLCBkZWYsIGx1eClcbn1cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVxdWVzdC1idXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlcXVlc3RGb3JHYW1lRXZlbnQpO1xuZnVuY3Rpb24gcmVxdWVzdEZvckdhbWVFdmVudCgpOiB2b2lkIHtcbiAgICBsZXQgZXBpID0gZ2FtZUV2ZW50SGFuZGxlci5oYW5kbGVSZXF1ZXN0Rm9yR2FtZUV2ZW50KHBsYXllciwgbGV2ZWwsIGdhbWVFdmVudFBvb2xzTGlzdCk7XG4gICAgY29uc29sZS5sb2coZXBpLm91dHB1dCgpKTtcbn1cblxuXG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4vdmlld1wiO1xuXG5leHBvcnQgY2xhc3MgUHJlc2VudGVyIHtcbiAgdmlldzogVmlldztcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy52aWV3ID0gbmV3IFZpZXcodGhpcyk7XG4gIH1cblxuICBVc2VySW5wdXQoc3RhcnQsIGVuZCk6IG5ldmVyIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgSW1wbGVtZW50ZWRcIik7XG4gIH1cbn1cbiIsImltcG9ydCB7IFByZXNlbnRlciB9IGZyb20gXCIuL3ByZXNlbnRlclwiO1xuXG5leHBvcnQgY2xhc3MgVmlldyB7XG4gICAgZG93bl90aW1lID0gMDtcbiAgICB1cF90aW1lID0gMDtcbiAgICBwcmVzZW50ZXI6IFByZXNlbnRlcjtcbiAgICBjb25zdHJ1Y3RvcihwcmVzZW50ZXI6IFByZXNlbnRlcikge1xuICAgICAgICB0aGlzLnByZXNlbnRlciA9IHByZXNlbnRlcjtcbiAgICAgICAgdGhpcy5pbml0X2xpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgaW5pdF9saXN0ZW5lcigpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwga2V5ZG93bl9ldmVudF9oYW5kbGVyKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGtleXVwX2V2ZW50X2hhbmRsZXIpO1xuXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgZnVuY3Rpb24ga2V5ZG93bl9ldmVudF9oYW5kbGVyKCkge1xuICAgICAgICAgICAgbGV0IG5vdzogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgICAgIGlmIChzZWxmLnVwX3RpbWUgPiBzZWxmLmRvd25fdGltZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZG93bl90aW1lID0gbm93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGtleXVwX2V2ZW50X2hhbmRsZXIoKSB7XG4gICAgICAgICAgICBsZXQgbm93OiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHNlbGYudXBfdGltZSA9IG5vdztcblxuICAgICAgICAgICAgc2VsZi5wcmVzZW50ZXIuVXNlcklucHV0KHNlbGYuZG93bl90aW1lLCBzZWxmLnVwX3RpbWUpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==
