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
},{"./GameEvent":1,"./GameEventHandler":2,"./Level":3,"./Player":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvR2FtZUV2ZW50LnRzIiwic3JjL0dhbWVFdmVudEhhbmRsZXIudHMiLCJzcmMvTGV2ZWwudHMiLCJzcmMvUGxheWVyLnRzIiwic3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0dBO0lBR0ksbUJBQVksSUFBWSxFQUFFLElBQVk7UUFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVNLDBCQUFNLEdBQWI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDcEIsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FYQSxBQVdDLElBQUE7QUFYcUIsOEJBQVM7Ozs7QUNDL0I7SUFDSTtJQUVBLENBQUM7SUFDTyw4Q0FBbUIsR0FBM0IsVUFBNEIsS0FBWSxFQUFFLGlCQUEwQztRQUNoRixPQUFPLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBQ08sd0NBQWEsR0FBckIsVUFBc0IsTUFBYyxFQUFFLEtBQVksRUFBRSxhQUErQjtRQUMvRSxJQUFJLFNBQVMsR0FBa0IsRUFBRSxDQUFDO1FBQ2xDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQ3pCLElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JELFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLGVBQWUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxFQUFFLEtBQUs7WUFFdEQsT0FBTyxLQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBYyxPQUFPLENBQUMsQ0FBQSxD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SSxHQUFHLEdBQVksUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXNCLENBQUMsYUFBYSxDQUFDO0lBQzNGLElBQUksR0FBRyxHQUFZLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFzQixDQUFDLGFBQWEsQ0FBQztJQUMzRixJQUFJLEdBQUcsR0FBWSxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBc0IsQ0FBQyxhQUFhLENBQUM7SUFDM0YsTUFBTSxHQUFHLElBQUksZUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBQzFDLENBQUM7QUFDRCxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFDekYsU0FBUyxtQkFBbUI7SUFDeEIsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMseUJBQXlCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3hGLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDOUIsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IExldmVsIH0gZnJvbSAnLi9MZXZlbCdcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9QbGF5ZXInXHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgR2FtZUV2ZW50IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHR5cGU6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdHlwZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFic3RyYWN0IGV2YWx1YXRlKHBsYXllcjogUGxheWVyLCBsZXZlbDogTGV2ZWwpOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgb3V0cHV0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgTGV2ZWwgfSBmcm9tICcuL0xldmVsJ1xyXG5pbXBvcnQgeyBHYW1lRXZlbnQgfSBmcm9tICcuL0dhbWVFdmVudCdcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9QbGF5ZXInXHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZUV2ZW50SGFuZGxlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNlbGVjdEdhbWVFdmVudFBvb2wobGV2ZWw6IExldmVsLCBnYW1lRXZlbnRQb29sTGlzdDogQXJyYXk8QXJyYXk8R2FtZUV2ZW50Pj4pOiBBcnJheTxHYW1lRXZlbnQ+IHtcclxuICAgICAgICByZXR1cm4gZ2FtZUV2ZW50UG9vbExpc3RbbGV2ZWwuc3RhZ2VdXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHBpY2tHYW1lRXZlbnQocGxheWVyOiBQbGF5ZXIsIGxldmVsOiBMZXZlbCwgZ2FtZUV2ZW50UG9vbDogQXJyYXk8R2FtZUV2ZW50Pik6IEdhbWVFdmVudCB7XHJcbiAgICAgICAgbGV0IHNjb3JlTGlzdDogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgICAgIGdhbWVFdmVudFBvb2wuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgbGV0IGdhbWVFdmVudFNjb3JlID0gZWxlbWVudC5ldmFsdWF0ZShwbGF5ZXIsIGxldmVsKTtcclxuICAgICAgICAgICAgc2NvcmVMaXN0LnB1c2goZ2FtZUV2ZW50U2NvcmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBwb3NzaWJpbGl0eUxpc3QgPSBzY29yZUxpc3QubWFwKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIE1hdGguZXhwKHZhbHVlKSAvIHNjb3JlTGlzdC5tYXAoIGZ1bmN0aW9uKHkgLyp2YWx1ZSovKXsgcmV0dXJuIE1hdGguZXhwKHkpIH0gKS5yZWR1Y2UoIGZ1bmN0aW9uKGEsYil7IHJldHVybiBhK2IgfSlcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlIC8gc2NvcmVMaXN0Lm1hcChmdW5jdGlvbiAoeSAvKnZhbHVlKi8pIHsgcmV0dXJuIHkgfSkucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhICsgYiB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGV0IHJhbmRvbU51bSA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgbGV0IGFjY3VtbGF0b3IgPSAwO1xyXG4gICAgICAgIGxldCBpZHg7XHJcbiAgICAgICAgZm9yIChpZHggPSAwOyBpZHggPCBwb3NzaWJpbGl0eUxpc3QubGVuZ3RoOyBpZHgrKykge1xyXG4gICAgICAgICAgICBhY2N1bWxhdG9yICs9IHBvc3NpYmlsaXR5TGlzdFtpZHhdO1xyXG4gICAgICAgICAgICBpZiAoYWNjdW1sYXRvciA+PSByYW5kb21OdW0pXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGdhbWVFdmVudFBvb2xbaWR4XTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBoYW5kbGVSZXF1ZXN0Rm9yR2FtZUV2ZW50KHBsYXllcjogUGxheWVyLCBsZXZlbDogTGV2ZWwsIGdhbWVFdmVudFBvb2xMaXN0OiBBcnJheTxBcnJheTxHYW1lRXZlbnQ+Pikge1xyXG4gICAgICAgIGxldCBnYW1lRXZlbnRQb29sID0gdGhpcy5zZWxlY3RHYW1lRXZlbnRQb29sKGxldmVsLCBnYW1lRXZlbnRQb29sTGlzdClcclxuICAgICAgICBsZXQgc2VsZWN0ZWRHYW1lRXZlbnQgPSB0aGlzLnBpY2tHYW1lRXZlbnQocGxheWVyLCBsZXZlbCwgZ2FtZUV2ZW50UG9vbClcclxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRHYW1lRXZlbnRcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBMZXZlbHtcclxuICAgIHN0YWdlOiBudW1iZXI7XHJcbiAgICBzdWJzdGFnZTogbnVtYmVyO1xyXG4gICAgcHJvZ3Jlc3Npb246IG51bWJlciA9IDA7XHJcbiAgICBjb25zdHJ1Y3RvcihzdGFnZTogbnVtYmVyLCBzdWJzdGFnZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XHJcbiAgICAgICAgdGhpcy5zdWJzdGFnZSA9IHN1YnN0YWdlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFBsYXllcntcclxuICAgIGhwOiBudW1iZXI7XHJcbiAgICBtYXhIcDogbnVtYmVyO1xyXG4gICAgYXRrOiBudW1iZXI7XHJcbiAgICBtYXhBdGs6IG51bWJlciA9IDEwMDtcclxuICAgIGRlZjogbnVtYmVyO1xyXG4gICAgbWF4RGVmOiBudW1iZXIgPSAxMDA7XHJcbiAgICBpdGVtTGlzdDogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgbWF4TnVtT2ZJdGVtczogbnVtYmVyID0gNTtcclxuICAgIG1vbmV5OiBudW1iZXIgPSAwO1xyXG4gICAgbHV4OiBudW1iZXI7XHJcbiAgICBtYXhMdXg6IG51bWJlciA9IDEwMDtcclxuICAgIGNvbnN0cnVjdG9yKGhwOiBudW1iZXIsIGF0azogbnVtYmVyLCBkZWY6IG51bWJlciwgbHV4OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuaHAgPSBocDtcclxuICAgICAgICB0aGlzLm1heEhwID0gaHA7XHJcbiAgICAgICAgdGhpcy5hdGsgPSBhdGs7XHJcbiAgICAgICAgdGhpcy5kZWYgPSBkZWY7XHJcbiAgICAgICAgdGhpcy5sdXggPSBsdXg7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBMZXZlbCB9IGZyb20gJy4vTGV2ZWwnXHJcbmltcG9ydCB7IEdhbWVFdmVudCB9IGZyb20gJy4vR2FtZUV2ZW50J1xyXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL1BsYXllcidcclxuaW1wb3J0IHsgR2FtZUV2ZW50SGFuZGxlciB9IGZyb20gJy4vR2FtZUV2ZW50SGFuZGxlcidcclxuXHJcbmNsYXNzIEJ1ZmZHYW1lRXZlbnQgZXh0ZW5kcyBHYW1lRXZlbnQge1xyXG4gICAgcHVibGljIGV2YWx1YXRlKHBsYXllciwgbGV2ZWwpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBocFJhdGlvID0gcGxheWVyLmhwIC8gcGxheWVyLm1heEhwO1xyXG4gICAgICAgIGxldCBhdGtSYXRpbyA9IHBsYXllci5hdGsgLyBwbGF5ZXIubWF4QXRrO1xyXG4gICAgICAgIGxldCBkZWZSYXRpbyA9IHBsYXllci5kZWYgLyBwbGF5ZXIubWF4RGVmO1xyXG4gICAgICAgIHJldHVybiAxIC0gKGhwUmF0aW8gKyBhdGtSYXRpbyArIGRlZlJhdGlvKSAvIDM7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgTmV3SXRlbUdhbWVFdmVudCBleHRlbmRzIEdhbWVFdmVudCB7XHJcbiAgICBwdWJsaWMgZXZhbHVhdGUocGxheWVyLCBsZXZlbCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDEgLSAocGxheWVyLml0ZW1MaXN0Lmxlbmd0aCAvIHBsYXllci5tYXhOdW1PZkl0ZW1zKTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBTdG9yeVRlbGxpbmdHYW1lRXZlbnQgZXh0ZW5kcyBHYW1lRXZlbnQge1xyXG4gICAgcHVibGljIGV2YWx1YXRlKHBsYXllciwgbGV2ZWwpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnBvdyhsZXZlbC5wcm9ncmVzc2lvbiAvIDEwMCwgMik7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgU2hvcHBpbmdHYW1lRXZlbnQgZXh0ZW5kcyBHYW1lRXZlbnQge1xyXG4gICAgcHVibGljIGV2YWx1YXRlKHBsYXllciwgbGV2ZWwpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXIubHV4IC8gcGxheWVyLm1heEx1eDtcclxuICAgIH1cclxufVxyXG5cclxudmFyIG51bU9mU3RhZ2VzOiBudW1iZXIgPSAyO1xyXG52YXIgZ2FtZUV2ZW50UG9vbHNMaXN0OiBBcnJheTxBcnJheTxHYW1lRXZlbnQ+PjtcclxudmFyIGxldmVsOiBMZXZlbCA9IG5ldyBMZXZlbCgwLCAwKTtcclxudmFyIHBsYXllcjogUGxheWVyO1xyXG52YXIgZ2FtZUV2ZW50SGFuZGxlcjogR2FtZUV2ZW50SGFuZGxlciA9IG5ldyBHYW1lRXZlbnRIYW5kbGVyKCk7XHJcblxyXG5nYW1lRXZlbnRQb29sc0xpc3QgPSBbXVxyXG5mb3IgKGxldCBpID0gMDsgaSA8IG51bU9mU3RhZ2VzOyBpKyspIHtcclxuICAgIGdhbWVFdmVudFBvb2xzTGlzdC5wdXNoKEFycmF5PEdhbWVFdmVudD4oKSk7XHJcbiAgICBzd2l0Y2ggKGkpIHtcclxuICAgICAgICBjYXNlIDA6IHtcclxuICAgICAgICAgICAgZ2FtZUV2ZW50UG9vbHNMaXN0W2ldLnB1c2gobmV3IEJ1ZmZHYW1lRXZlbnQoXCJidWZmXCIsIDApKVxyXG4gICAgICAgICAgICBnYW1lRXZlbnRQb29sc0xpc3RbaV0ucHVzaChuZXcgTmV3SXRlbUdhbWVFdmVudChcIm5ld0l0ZW1cIiwgMSkpXHJcbiAgICAgICAgICAgIGdhbWVFdmVudFBvb2xzTGlzdFtpXS5wdXNoKG5ldyBTaG9wcGluZ0dhbWVFdmVudChcInNob3BcIiwgMikpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIDE6IHtcclxuICAgICAgICAgICAgZ2FtZUV2ZW50UG9vbHNMaXN0W2ldLnB1c2gobmV3IEJ1ZmZHYW1lRXZlbnQoXCJidWZmXCIsIDApKVxyXG4gICAgICAgICAgICBnYW1lRXZlbnRQb29sc0xpc3RbaV0ucHVzaChuZXcgTmV3SXRlbUdhbWVFdmVudChcIm5ld0l0ZW1cIiwgMSkpXHJcbiAgICAgICAgICAgIGdhbWVFdmVudFBvb2xzTGlzdFtpXS5wdXNoKG5ldyBTaG9wcGluZ0dhbWVFdmVudChcInNob3BcIiwgMikpXHJcbiAgICAgICAgICAgIGdhbWVFdmVudFBvb2xzTGlzdFtpXS5wdXNoKG5ldyBTdG9yeVRlbGxpbmdHYW1lRXZlbnQoXCJzdG9yeVwiLCAzKSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVudGVyLWJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZm9ybVBsYXllcik7XHJcbmZ1bmN0aW9uIGZvcm1QbGF5ZXIoKTogdm9pZCB7XHJcbiAgICBsZXQgaHA6IG51bWJlciA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhwLWlucHV0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlQXNOdW1iZXI7XHJcbiAgICBsZXQgZGVmOiBudW1iZXIgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWYtaW5wdXRcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWVBc051bWJlcjtcclxuICAgIGxldCBhdGs6IG51bWJlciA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImF0ay1pbnB1dFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZUFzTnVtYmVyO1xyXG4gICAgbGV0IGx1eDogbnVtYmVyID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibHV4LWlucHV0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlQXNOdW1iZXI7XHJcbiAgICBwbGF5ZXIgPSBuZXcgUGxheWVyKGhwLCBhdGssIGRlZiwgbHV4KVxyXG59XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVxdWVzdC1idXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlcXVlc3RGb3JHYW1lRXZlbnQpO1xyXG5mdW5jdGlvbiByZXF1ZXN0Rm9yR2FtZUV2ZW50KCk6IHZvaWQge1xyXG4gICAgbGV0IGVwaSA9IGdhbWVFdmVudEhhbmRsZXIuaGFuZGxlUmVxdWVzdEZvckdhbWVFdmVudChwbGF5ZXIsIGxldmVsLCBnYW1lRXZlbnRQb29sc0xpc3QpO1xyXG4gICAgY29uc29sZS5sb2coZXBpLm91dHB1dCgpKTtcclxufVxyXG5cclxuXHJcbiJdfQ==
