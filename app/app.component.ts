import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatSliderChange,
  MatSnackBar
} from '@angular/material';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent implements OnInit {
  value: number = 1;
  sliderValue: number;
  interval: any;
  isStartButtonDisabled = false;
  isSliderDisabled = false;
  isMatSubtitleVisible = false;
  dryingInfoVisible = false;
  defuzzyficatedValue: number;
  timeLeft: number;
  //--
  drying3 = new Array();
  dryingHigh: number;
  //#region values for entry soil humidity
  humidity = new Array();
  humidity2 = new Array();
  humidity3 = new Array();
  humidityFzfctd: number;
  humidityFzfctd2: number;
  humidityFzfctd3: number;
  //#endregion end of entry humidity
  //========================================================
  //#region values for irrogation
  irrigation = new Array();
  irrigation2 = new Array();
  irrigation3 = new Array();
  irrigationHigh: number;
  irrigationAvg: number;
  irrigationLow: number;
  highX: number;
  avgX: number;
  lowX: number;
  //#endregion end of values irrogation

  test = new Array();
  ngOnInit() {
    this.drying();
    this.sliderValue = 1;
    this.initIrrogationTerms();
  }
  constructor(private _snackBar: MatSnackBar) {}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  click() {
    this.isSliderDisabled = true;
  }
  startTimer() {
    this.value = this.sliderValue;
    this.isStartButtonDisabled = true;
    this.isSliderDisabled = true;
    this.interval = setInterval(() => {
      if (this.timeLeft > 1) {
        this.timeLeft--;
        this.value++;
      }
      if (this.value > 75) {
        this.openSnackBar("Rozpoczęto oszuszanie, ponieważ przekroczono wilgotność gleby", "ok");
        this.value--;
      }
    }, 100)

  }

  onInputChange(event: MatSliderChange) {
    this.sliderValue = event.value;
    this.isMatSubtitleVisible = true;
    this.initHumidityTerms();
    this.rules();
    this.findIrrigationLvl();
    this.centerOfGravity();
    this.ruleDrying();
  }

  pauseTimer() {
    window.location.reload();
    this.timeLeft = 1;
    this.sliderValue = 1;
    this.value = 1;
    this.isStartButtonDisabled = false;
    clearInterval(this.interval);

  }
  centerOfGravity() {

    if (this.highX === undefined) this.highX = 0;
    if (this.avgX === undefined) this.avgX = 0;
    if (this.lowX === undefined) this.lowX = 0;

    this.defuzzyficatedValue = ((this.irrigationHigh * this.highX + this.irrigationAvg * this.avgX + this.irrigationLow * this.lowX) / 3) / (this.irrigationAvg + this.irrigationHigh + this.irrigationLow);
    if (isNaN(this.defuzzyficatedValue)) {
      this.defuzzyficatedValue = 0;
    }
    console.log('this.defuzzyficatedValue', this.defuzzyficatedValue);
    this.timeLeft = Math.round(this.defuzzyficatedValue);

  }

  findIrrigationLvl() {
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
  }
  ruleDrying() {
    if (this.irrigationLow === 0) {
      this.dryingHigh = this.drying3[this.sliderValue];
    }
  }
  rules() {
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

  }
  drying() {
    var aH = 60;
    var x1H = 80;
    var x2H = 100;
    var high: number;
    for (var i = 1; i <= x2H; i++) {
      var x = i
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
  }
  //irrogation
  //#region
  initIrrogationTerms() {
    this.irrogationTermLow();
    this.irrogationTermAvg();
    this.irrogationTermHigh();
  }
  irrogationTermLow() {
    this.irrigation.push(0);
  }
  irrogationTermAvg() {

    var a = 45 * 3;
    var b = 60 * 3;
    var x0 = 53 * 3;
    var avg: number;
    for (var i = 1; i <= 15 * 3; i++) {
      var x = (a - 1) + i;
      if (a <= x && x <= x0) {
        avg = (x - a) / (x0 - a);
      }
      if (x0 <= x && x <= b) {
        avg = (b - x) / (b - x0)
      }
      this.irrigation2.push(avg);
    }
  }
  irrogationTermHigh() {
    var a = 60 * 3;
    var x1 = 80 * 3;
    var x2 = 100 * 3;
    for (var i = 1; i < 41 * 3; i++) {
      var x = a + i;
      var high: number;
      if (a <= x && x <= x1) {
        high = (x - a) / (x1 - a);
      }
      if (x1 <= x && x <= x2) {
        high = 1;
      }
      this.irrigation3.push(high);

    }
  }
  //#endregion

  //#region Humidity
  initHumidityTerms() {
    this.calculateHumidity();
    this.rules();
  }
  calculateHumidity() {
    for (var i = 1; i <= 101; i++) {
      var x = i;
      var x1Low = 1;
      var x2low = 30;
      var bLow = 45;
      var low: number;
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
      var avg: number;
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
      var high: number;
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
  }
  //#endregion
}