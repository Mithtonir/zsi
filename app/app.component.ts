import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatSliderChange
} from '@angular/material';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent implements OnInit {
  value: number = 1;
  sliderValue: number; // 

  timeLeft: number;
  interval: any;
  isStartButtonDisabled = false;
  defuzzyficatedValue: any;
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
  irrLvl: any[][];
  //#endregion end of values irrogation
  
  test = new Array();
  ngOnInit() {
    this.sliderValue = 1;
    this.initIrrogationTerms();
  }
  startTimer() {
    this.isStartButtonDisabled = true;
    this.timeLeft = this.sliderValue;
    this.interval = setInterval(() => {
      if (this.timeLeft > 1) {
        this.timeLeft--;
        this.value++;
      }
    }, 1000)
  }
  onInputChange(event: MatSliderChange) {
    this.sliderValue = event.value;
    this.initHumidityTerms();
    this.rules();
    this.findIrrigationLvl();
    this.defuzzyfication();
  }

  pauseTimer() {
    this.isStartButtonDisabled = false;
    clearInterval(this.interval);
    this.test = this.humidity;
    console.log('this.test', this.test)

  }
  defuzzyfication(){
    if(this.irrigationHigh === undefined) this.irrigationHigh=0;
    if(this.irrigationAvg === undefined) this.irrigationAvg=0;
    if(this.irrigationLow === undefined) this.irrigationLow=0;
    
    var sum = this.irrigationAvg + this.irrigationHigh + this.irrigationLow;
    console.log('sum', sum)
    this.defuzzyficatedValue = (this.irrigationHigh * this.highX/3 + this.irrigationAvg * this.avgX/3 + this.irrigationLow * this.lowX/3)/(sum);
    console.log('this.defuzzyficatedValue', this.defuzzyficatedValue);
    console.log('this.irrigationAvg', this.irrigationAvg);
  }
  findIrrigationLvl(){
    for(var i = 0; i<=135; i++){
    if(this.humidity[this.humidityFzfctd] === this.irrigation3[i] && i <= 122)
    {
      this.irrigationHigh =  this.humidity[this.humidityFzfctd];
      this.highX = i;
    }
    if(this.humidity2[this.humidityFzfctd2] === this.irrigation2[i] && i <= 44)
    {
      this.irrigationAvg =  this.humidity2[this.humidityFzfctd2];
      this.avgX = i;
    }
    if(this.humidity3[this.humidityFzfctd3] === this.irrigation[i] && i <= 134)
    {
      this.irrigationLow =  this.humidity3[this.humidityFzfctd3];
      this.lowX = i;
    }
  }
  // console.log('this.humidity[this.humidityFzfctd]', this.humidity[this.humidityFzfctd])
  // console.log('this.humidity2[this.humidityFzfctd2]', this.humidity2[this.humidityFzfctd2])
  // console.log('this.humidity3[this.humidityFzfctd3]', this.humidity3[this.humidityFzfctd3])
  }
  rules() {
    if (this.humidity[this.humidityFzfctd]) {
      if (this.sliderValue >= 45) this.irrigationHigh = 0;
      else if (this.humidity[this.humidityFzfctd] > 0) {
        this.irrigationHigh = this.humidity[this.humidityFzfctd];
        // console.log('this.humidity[this.humidityFzfctd]', this.humidity[this.humidityFzfctd])
      }
    }
    if (this.humidity[this.humidityFzfctd2]) {
      if ((this.sliderValue >= 35) && (this.sliderValue <= 75)) this.irrigationAvg = 0;
      else if (this.humidity[this.humidityFzfctd2] > 0) {
        this.irrigationAvg = this.humidity[this.humidityFzfctd2];
      }
    }
    if (this.humidity[this.humidityFzfctd3]) {
      if (this.sliderValue >= 76) this.irrigationLow = 0;
      else if (this.humidity[this.humidityFzfctd3] > 0) {
        this.irrigationLow = this.humidity[this.humidityFzfctd3];
      }
    }
  }

  //irrogation
  //#region
  initIrrogationTerms() {
    this.irrogationTermLow();
    this.irrogationTermAvg();
    this.irrogationTermHigh();
    // console.log('irrigation3', this.irrigation3);
  }
  irrogationTermLow() {
    //1-45; 30-45
    var a = 45*3;
    var x2 = 35*3;
    var b = 48*3;
    var low: number;
    for (var i = 1; i <= 45*3; i++) {
      var x = i;
      if (x < 30) {
        low = 1;
      }
      if (x2 <= x && x <= b) {
        low = (b - x) / (b - x2);
      }
      if (x > 45) {
        low = 0;
      }
      this.irrigation.push(low);
    }
  }
  irrogationTermAvg() {

    var a = 45*3;
    var b = 60*3;
    var x0 = 53*3;
    var avg: number;
    for (var i = 1; i <= 15*3; i++) {
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
    var a = 60*3;
    var x1 = 80*3;
    var x2 = 100*3;
    //60- 101; 70-80;
    for (var i = 1; i < 41*3; i++) {
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
    this.termHumidityLow();
    this.termHumidityAvg();
    this.termHumidityHigh();
    this.rules();
  }
  termHumidityLow() {
    //1-45; 30-45 
    for (var i = 1; i <= 45; i++) {

      var x = i;
      var x2 = 30;
      var b = 45;
      var low: number;
      if (x <= 30 && x >= 1) {
        low = 1;
      }
      if (x >= 30 && x <= 45) {
        low = (b - x) / (b - x2);
      }
      this.humidity.push(low);
      if (this.sliderValue === x) {
        this.humidityFzfctd = x;
      }
      if (x === 1) {
        this.humidityFzfctd = 0
      }
    }
    // console.log('this.humidity', this.humidity)
  }
  termHumidityAvg() {
    //35 do 75, abv = 1 {40 do 60 }
    var i = 1;
    var x1 = 45;
    var x2 = 60;
    var a = 35;
    var b = 75;
    for (i; i <= 41; i++) {
      var x = (a - 1) + i;
      var avg: number;
      if (a <= x && x <= x1) {
        avg = (x - a) / (x1 - a);
      }
      if (x1 <= x && x <= x2) {
        avg = 1;
      }
      if (x2 <= x && x <= b) {
        avg = (b - x) / (b - x2);
      } else if (x < 25 && x > 75) {
        avg = 0
      }
      this.humidity2.push(avg);
      if (this.sliderValue === x) {
        this.humidityFzfctd2 = i;
      }
    }
  }

  termHumidityHigh() {
    var a = 60;
    var x1 = 80;
    var x2 = 100;
    //60- 101; 70-80;
    for (var i = 1; i < 41; i++) {
      var x = 59 + i;
      var high: number;
      if (a <= x && x <= x1) {
        high = (x - a) / (x1 - a);
      }
      if (x1 <= x && x <= x2) {
        high = 1;
      }
      this.humidity3.push(high);
      if (this.sliderValue === x) {
        this.humidityFzfctd3 = i;
      }
    }
  }
  //#endregion
}