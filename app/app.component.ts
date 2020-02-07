import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatSliderChange
} from '@angular/material';
import { Xliff2 } from '@angular/compiler';
@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent implements OnInit {
  value: number = 1;
  sliderValue: number;

  timeLeft: number;
  interval: any;
  //values for fuzzy

  irrigation = new Array();
  irrigation2 = new Array();
  irrigation3 = new Array();

  //end of fuzzy values
test = new Array();
  ngOnInit() {
  
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
    this.test = this.irrigation;
    console.log('this.test', this.test)
    
  }
  jeb(){
    this.termLow();
    this.termAvg();
    this.termHigh();
    
    console.log('this.irrigation', this.irrigation);
    console.log('this.irrigation2', this.irrigation2);
    console.log('this.irrigation3', this.irrigation3);
  }
termLow() {
  //1-45; 30-45
  for (var i = 0; i <= 45; i++) {
    console.log('i', i)
    var x = i;
    var low: number;
    if (x > 30 && x <= 45) {
      low = (x - 30) / (45 - 30);
    } if (x <= 30) {
      low = 1;
    }
    if (x> 45) {
      low = 0;
    }
    this.irrigation.push(low);
    
  }
  
  // console.log('this.irrigation', this.irrigation)
  
}
  termAvg() {
    //25 do 75, abv = 1 {40 do 60 }
    var i = 1;
    var x1 = 40;
    var x2 = 60;
    var a = 25;
    var b = 75;
    for (i; i <= 51; i++) {
      console.log('i', i);
      var x = 24 + i;
      var avg: number;
      if (a <= x && x <= x1) {
        avg = (x - a) / (40 - 25);      
      } 
      if (x1<= x && x <=x2) {
        avg = 1;
      } 
      if(x2<=x && x<= b){
        avg = (b-x)/(b-x2);
      }
      else if (x<25 && x>75) {
        avg = 0
              }
              this.irrigation2.push(avg);
    }
    console.log('this.irrigation', this.irrigation)
  }

  termHigh() {
    var a = 60;
    var x1 = 80;
    var x2 = 100;
    //60- 101; 70-80;
    for(var i=1; i<41; i++){
      var x = 59 + i;
      var high: number;
      if(a<= x && x<= x1){
        high = (x-a)/(x1-a);
              }
      if (x1<=x && x<= x2){
        high = 1;
      }
      else if (x<60 && x>100){
        high = 0;
      }
      this.irrigation3.push(high);
    }
  }
}