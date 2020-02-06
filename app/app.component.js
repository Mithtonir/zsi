"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.value = 1;
        //values for fuzzy
        this.avgValue = new Array();
        //end of fuzzy values
        this.iArr = new Array();
    }
    AppComponent.prototype.startTimer = function () {
        var _this = this;
        this.timeLeft = this.sliderValue;
        this.interval = setInterval(function () {
            if (_this.timeLeft > 1) {
                _this.timeLeft--;
                _this.value++;
                _this.termAvg();
            }
        }, 1000);
    };
    AppComponent.prototype.onInputChange = function (event) {
        this.sliderValue = event.value;
    };
    AppComponent.prototype.pauseTimer = function () {
        clearInterval(this.interval);
    };
    AppComponent.prototype.termAvg = function () {
        //25 do 75, abv = 1 {40 do 60 }
        var i = 1;
        for (i; i <= 51; i++) {
            var x = 25 + i;
            if (x >= 25 && x <= 75) {
                var toPush = (x - 40) / (75 - 25);
                this.avgValue.push(2, toPush);
                this.iArr.push(x);
            }
            else if (x >= 40 && x <= 60) {
                this.avgValue.push(2, 1);
            }
            else {
                this.avgValue.push(2, 1);
            }
        }
        if (this.timeLeft < 1) {
            console.log('this.iArr', this.iArr);
            console.log('this.avgValue', this.avgValue);
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html'
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map