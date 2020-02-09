"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var AppComponent = /** @class */ (function () {
    function AppComponent(_snackBar) {
        this._snackBar = _snackBar;
        this.value = 1;
        this.isStartButtonDisabled = false;
        this.isSliderDisabled = false;
        this.isMatSubtitleVisible = false;
        this.dryingInfoVisible = false;
        //--
        this.drying3 = new Array();
        //#region values for entry soil humidity
        this.humidity = new Array();
        this.humidity2 = new Array();
        this.humidity3 = new Array();
        //#endregion end of entry humidity
        //========================================================
        //#region values for irrogation
        this.irrigation = new Array();
        this.irrigation2 = new Array();
        this.irrigation3 = new Array();
        //#endregion end of values irrogation
        this.test = new Array();
    }
    AppComponent.prototype.ngOnInit = function () {
        this.drying();
        this.sliderValue = 1;
        this.initIrrogationTerms();
    };
    AppComponent.prototype.openSnackBar = function (message, action) {
        this._snackBar.open(message, action, {
            duration: 2000,
        });
    };
    AppComponent.prototype.click = function () {
        this.isSliderDisabled = true;
    };
    AppComponent.prototype.startTimer = function () {
        var _this = this;
        this.value = this.sliderValue;
        this.isStartButtonDisabled = true;
        this.isSliderDisabled = true;
        this.interval = setInterval(function () {
            if (_this.timeLeft > 1) {
                _this.timeLeft--;
                _this.value++;
            }
            if (_this.value > 75) {
                _this.openSnackBar("Rozpoczęto oszuszanie, ponieważ przekroczono wilgotność gleby", "ok");
                _this.value--;
            }
        }, 100);
    };
    AppComponent.prototype.onInputChange = function (event) {
        this.sliderValue = event.value;
        this.isMatSubtitleVisible = true;
        this.initHumidityTerms();
        this.rules();
        this.findIrrigationLvl();
        this.centerOfGravity();
        this.ruleDrying();
    };
    AppComponent.prototype.pauseTimer = function () {
        window.location.reload();
        this.timeLeft = 1;
        this.sliderValue = 1;
        this.value = 1;
        this.isStartButtonDisabled = false;
        clearInterval(this.interval);
    };
    AppComponent.prototype.centerOfGravity = function () {
        if (this.highX === undefined)
            this.highX = 0;
        if (this.avgX === undefined)
            this.avgX = 0;
        if (this.lowX === undefined)
            this.lowX = 0;
        this.defuzzyficatedValue = ((this.irrigationHigh * this.highX + this.irrigationAvg * this.avgX + this.irrigationLow * this.lowX) / 3) / (this.irrigationAvg + this.irrigationHigh + this.irrigationLow);
        if (isNaN(this.defuzzyficatedValue)) {
            this.defuzzyficatedValue = 0;
        }
        console.log('this.defuzzyficatedValue', this.defuzzyficatedValue);
        this.timeLeft = Math.round(this.defuzzyficatedValue);
    };
    AppComponent.prototype.findIrrigationLvl = function () {
        for (var i = 0; i <= 135; i++) {
            if (this.humidity[this.humidityFzfctd] === this.irrigation3[i]) {
                this.irrigationHigh = this.humidity[this.humidityFzfctd];
                this.highX = i;
            }
            if (this.humidity2[this.humidityFzfctd2] === this.irrigation2[i]) {
                this.irrigationAvg = this.humidity2[this.humidityFzfctd2];
                this.avgX = i;
            }
            if (this.humidity3[this.humidityFzfctd3] === this.irrigation[i]) {
                this.irrigationLow = this.humidity3[this.humidityFzfctd3];
                this.lowX = i;
            }
        }
    };
    AppComponent.prototype.ruleDrying = function () {
        if (this.irrigationLow === 0) {
            this.dryingHigh = this.drying3[this.sliderValue];
        }
    };
    AppComponent.prototype.rules = function () {
        if (this.humidity[this.humidityFzfctd]) {
            if (this.humidity[this.humidityFzfctd] > 0) {
                this.irrigationHigh = this.humidity[this.humidityFzfctd];
            }
        }
        if (this.humidity[this.humidityFzfctd2]) {
            if (this.humidity[this.humidityFzfctd2] > 0) {
                this.irrigationAvg = this.humidity[this.humidityFzfctd2];
            }
        }
        if (this.humidity[this.humidityFzfctd3]) {
            if (this.humidity[this.humidityFzfctd3] > 0) {
                this.irrigationLow = this.humidity[this.humidityFzfctd3];
            }
        }
    };
    AppComponent.prototype.drying = function () {
        var aH = 60;
        var x1H = 80;
        var x2H = 100;
        var high;
        for (var i = 1; i <= x2H; i++) {
            var x = i;
            if (aH <= x && x <= x1H) {
                high = (x - aH) / (x1H - aH);
            }
            if (x1H <= x && x <= x2H) {
                high = 1;
            }
            if (x < 60) {
                high = 0;
            }
            this.drying3.push(high);
        }
    };
    //irrogation
    //#region
    AppComponent.prototype.initIrrogationTerms = function () {
        this.irrogationTermLow();
        this.irrogationTermAvg();
        this.irrogationTermHigh();
    };
    AppComponent.prototype.irrogationTermLow = function () {
        this.irrigation.push(0);
    };
    AppComponent.prototype.irrogationTermAvg = function () {
        var a = 45 * 3;
        var b = 60 * 3;
        var x0 = 53 * 3;
        var avg;
        for (var i = 1; i <= 15 * 3; i++) {
            var x = (a - 1) + i;
            if (a <= x && x <= x0) {
                avg = (x - a) / (x0 - a);
            }
            if (x0 <= x && x <= b) {
                avg = (b - x) / (b - x0);
            }
            this.irrigation2.push(avg);
        }
    };
    AppComponent.prototype.irrogationTermHigh = function () {
        var a = 60 * 3;
        var x1 = 80 * 3;
        var x2 = 100 * 3;
        for (var i = 1; i < 41 * 3; i++) {
            var x = a + i;
            var high;
            if (a <= x && x <= x1) {
                high = (x - a) / (x1 - a);
            }
            if (x1 <= x && x <= x2) {
                high = 1;
            }
            this.irrigation3.push(high);
        }
    };
    //#endregion
    //#region Humidity
    AppComponent.prototype.initHumidityTerms = function () {
        this.calculateHumidity();
        this.rules();
    };
    AppComponent.prototype.calculateHumidity = function () {
        for (var i = 1; i <= 101; i++) {
            var x = i;
            var x1Low = 1;
            var x2low = 30;
            var bLow = 45;
            var low;
            if (x1Low <= x && x <= x2low) {
                low = 1;
            }
            if (x >= 30 && x <= 45) {
                low = (bLow - x) / (bLow - x2low);
            }
            this.humidity.push(low);
            if (this.sliderValue === x) {
                this.humidityFzfctd = x;
            }
            var x1Avg = 45;
            var x2Avg = 60;
            var aAvg = 35;
            var bAvg = 75;
            var avg;
            if (aAvg <= x && x <= x1Avg) {
                avg = (x - aAvg) / (x1Avg - aAvg);
            }
            if (x1Avg <= x && x <= x2Avg) {
                avg = 1;
            }
            if (x2Avg <= x && x <= bAvg) {
                avg = (bAvg - x) / (bAvg - x2Avg);
            }
            if (x < 35) {
                avg = 0;
            }
            this.humidity2.push(avg);
            if (this.sliderValue === x) {
                this.humidityFzfctd2 = i;
            }
            var aH = 60;
            var x1H = 80;
            var x2H = 100;
            var high;
            if (aH <= x && x <= x1H) {
                high = (x - aH) / (x1H - aH);
            }
            if (x1H <= x && x <= x2H) {
                high = 1;
            }
            if (x < 60) {
                high = 0;
            }
            this.humidity3.push(high);
            if (this.sliderValue === x) {
                this.humidityFzfctd3 = i;
            }
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html'
        }),
        __metadata("design:paramtypes", [material_1.MatSnackBar])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map