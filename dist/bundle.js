(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var presenter_1 = require("./presenter");
var presenter = new presenter_1.Presenter();

},{"./presenter":2}],2:[function(require,module,exports){
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

},{"./view":3}],3:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi50cyIsInNyYy9wcmVzZW50ZXIudHMiLCJzcmMvdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEseUNBQXdDO0FBRXhDLElBQUksU0FBUyxHQUFHLElBQUkscUJBQVMsRUFBRSxDQUFDOzs7OztBQ0ZoQywrQkFBOEI7QUFFOUI7SUFFRTtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDZCQUFTLEdBQVQsVUFBVSxLQUFLLEVBQUUsR0FBRztRQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FUQSxBQVNDLElBQUE7QUFUWSw4QkFBUzs7Ozs7QUNBdEI7SUFJSSxjQUFZLFNBQW9CO1FBSGhDLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBR1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCw0QkFBYSxHQUFiO1FBQ0ksUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQzVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUV4RCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsU0FBUyxxQkFBcUI7WUFDMUIsSUFBSSxHQUFHLEdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUV2QyxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7YUFDeEI7UUFDTCxDQUFDO1FBQ0QsU0FBUyxtQkFBbUI7WUFDeEIsSUFBSSxHQUFHLEdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUVuQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzRCxDQUFDO0lBQ0wsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQTVCQSxBQTRCQyxJQUFBO0FBNUJZLG9CQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgUHJlc2VudGVyIH0gZnJvbSBcIi4vcHJlc2VudGVyXCI7XG5cbmxldCBwcmVzZW50ZXIgPSBuZXcgUHJlc2VudGVyKCk7XG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4vdmlld1wiO1xuXG5leHBvcnQgY2xhc3MgUHJlc2VudGVyIHtcbiAgdmlldzogVmlldztcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy52aWV3ID0gbmV3IFZpZXcodGhpcyk7XG4gIH1cblxuICBVc2VySW5wdXQoc3RhcnQsIGVuZCk6IG5ldmVyIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJub3QgSW1wbGVtZW50ZWRcIik7XG4gIH1cbn1cbiIsImltcG9ydCB7IFByZXNlbnRlciB9IGZyb20gXCIuL3ByZXNlbnRlclwiO1xuXG5leHBvcnQgY2xhc3MgVmlldyB7XG4gICAgZG93bl90aW1lID0gMDtcbiAgICB1cF90aW1lID0gMDtcbiAgICBwcmVzZW50ZXI6IFByZXNlbnRlcjtcbiAgICBjb25zdHJ1Y3RvcihwcmVzZW50ZXI6IFByZXNlbnRlcikge1xuICAgICAgICB0aGlzLnByZXNlbnRlciA9IHByZXNlbnRlcjtcbiAgICAgICAgdGhpcy5pbml0X2xpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgaW5pdF9saXN0ZW5lcigpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwga2V5ZG93bl9ldmVudF9oYW5kbGVyKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGtleXVwX2V2ZW50X2hhbmRsZXIpO1xuXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgZnVuY3Rpb24ga2V5ZG93bl9ldmVudF9oYW5kbGVyKCkge1xuICAgICAgICAgICAgbGV0IG5vdzogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgICAgIGlmIChzZWxmLnVwX3RpbWUgPiBzZWxmLmRvd25fdGltZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZG93bl90aW1lID0gbm93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGtleXVwX2V2ZW50X2hhbmRsZXIoKSB7XG4gICAgICAgICAgICBsZXQgbm93OiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHNlbGYudXBfdGltZSA9IG5vdztcblxuICAgICAgICAgICAgc2VsZi5wcmVzZW50ZXIuVXNlcklucHV0KHNlbGYuZG93bl90aW1lLCBzZWxmLnVwX3RpbWUpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==
