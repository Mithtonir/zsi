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
    }
    //end of fuzzy values
    AppComponent.prototype.ngOnInit = function () {
        this.termLow();
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
    };
    AppComponent.prototype.termLow = function () {
        //1-45; 30-45
        for (var i = 1; i <= 45; i++) {
            var x = i;
            var low;
            if (x > 30 && x <= 45) {
                low = (x - 30) / (45 - 30);
            }
            else if (x <= 30) {
                low = 1;
            }
            else if (x > 45) {
                low = 0;
            }
            if (i === 45)
                break;
            this.irrigation.push(1, low);
        }
        console.log('this.irrigation', this.irrigation);
    };
    AppComponent.prototype.termAvg = function () {
        //25 do 75, abv = 1 {40 do 60 }
        var i = 1;
        for (i; i <= 51; i++) {
            var x = 25 + i;
            var avg;
            if (x >= 25 && x <= 75) {
                avg = (x - 40) / (75 - 25);
            }
            else if (x >= 40 && x <= 60) {
                avg = 1;
            }
            else if (x >= 60 && x <= 75) {
                avg = 0;
            }
        }
        this.irrigation.push(2, avg);
        console.log('this.irrigation', this.irrigation);
    };
    AppComponent.prototype.termHigh = function () {
        //60- 101; 70-80;
        for (var i = 1; i < 41; i++) {
            var x = 60 + i;
            if (x >= 60 && x < 101) {
                var high = (x - 70) / (80 - 70);
                this.irrigation.push(3, high);
            }
            else if (x >= 80 && x < 101) {
                this.irrigation.push(3, 1);
            }
            else {
                this.irrigation.push(3, 0);
            }
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