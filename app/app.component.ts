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
  //values for entry humidity
  humidity = new Array();
  humidity2 = new Array();
  humidity3 = new Array();
  humidityFzfctd: number;
  humidityFzfctd2: number;
  humidityFzfctd3: number;
  //end of entry humidity
  //========================================================
  //values for irrogation


  //end of values irrogation

  test = new Array();
  ngOnInit() {
    this.sliderValue = 1;
  }
  startTimer() {
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
  }


  pauseTimer() {
    clearInterval(this.interval);
    this.test = this.humidity;
    console.log('this.test', this.test)

  }
  initHumidityTerms() {
    this.termHumidityLow();
    this.termHumidityAvg();
    this.termHumidityHigh();
  }
  termHumidityLow() {
    //1-45; 30-45
    for (var i = 1; i <= 45; i++) {
      var x = i;
      var x2 = 30;
      var b = 45;
      var low: number;
      if (x < 30) {
        low = 1;
      }
      if (x >= 30 && x <= 45) {
        low = (b - x) / (b - x2);
      }
      if (x > 45) {
        low = 0;
      }
      this.humidity.push(low);
      if (this.sliderValue === x) {
        this.humidityFzfctd = x;
      }
    }
  }
  termHumidityAvg() {
    //25 do 75, abv = 1 {40 do 60 }
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
}