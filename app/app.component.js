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
        this.irrigation = new Array();
        this.irrigation2 = new Array();
        this.irrigation3 = new Array();
        //end of fuzzy values
        this.test = new Array();
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.startTimer = function () {
        var _this = this;
        this.timeLeft = this.sliderValue;
        this.interval = setInterval(function () {
            if (_this.timeLeft > 1) {
                _this.timeLeft--;
                _this.value++;
            }
        }, 1000);
    };
    AppComponent.prototype.onInputChange = function (event) {
        this.sliderValue = event.value;
    };
    AppComponent.prototype.pauseTimer = function () {
        clearInterval(this.interval);
        this.test = this.irrigation;
        console.log('this.test', this.test);
    };
    AppComponent.prototype.jeb = function () {
        this.termLow();
        this.termAvg();
        this.termHigh();
        console.log('this.irrigation', this.irrigation);
        console.log('this.irrigation2', this.irrigation2);
        console.log('this.irrigation3', this.irrigation3);
    };
    AppComponent.prototype.termLow = function () {
        //1-45; 30-45
        for (var i = 0; i <= 45; i++) {
            console.log('i', i);
            var x = i;
            var low;
            if (x > 30 && x <= 45) {
                low = (x - 30) / (45 - 30);
            }
            if (x <= 30) {
                low = 1;
            }
            if (x > 45) {
                low = 0;
            }
            this.irrigation.push(low);
        }
        // console.log('this.irrigation', this.irrigation)
    };
    AppComponent.prototype.termAvg = function () {
        //25 do 75, abv = 1 {40 do 60 }
        var i = 1;
        var x1 = 40;
        var x2 = 60;
        var a = 25;
        var b = 75;
        for (i; i <= 51; i++) {
            console.log('i', i);
            var x = 24 + i;
            var avg;
            if (a <= x && x <= x1) {
                avg = (x - a) / (40 - 25);
            }
            if (x1 <= x && x <= x2) {
                avg = 1;
            }
            if (x2 <= x && x <= b) {
                avg = (b - x) / (b - x2);
            }
            else if (x < 25 && x > 75) {
                avg = 0;
            }
            this.irrigation2.push(avg);
        }
        console.log('this.irrigation', this.irrigation);
    };
    AppComponent.prototype.termHigh = function () {
        var a = 60;
        var x1 = 80;
        var x2 = 100;
        //60- 101; 70-80;
        for (var i = 1; i < 41; i++) {
            var x = 59 + i;
            var high;
            if (a <= x && x <= x1) {
                high = (x - a) / (x1 - a);
            }
            if (x1 <= x && x <= x2) {
                high = 1;
            }
            else if (x < 60 && x > 100) {
                high = 0;
            }
            this.irrigation3.push(high);
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