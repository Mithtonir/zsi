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
  sliderValue: number;

  timeLeft: number;
  interval: any;
  //values for fuzzy

  irrigation = new Array();

  //end of fuzzy values

  ngOnInit() {        this.termLow();
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
    
  }
termLow() {
  //1-45; 30-45
  for (var i = 1; i <= 45; i++) {
    var x = i;
    var low: number;
    if (x > 30 && x <= 45) {
      low = (x - 30) / (45 - 30);
    }  else if (x <= 30) {
      low = 1;
    }
     else if (x>45){
      low = 0;
    }
    if(i === 45) break;
    this.irrigation.push(1, low);
  }
  
  console.log('this.irrigation', this.irrigation)
  
}
  termAvg() {
    //25 do 75, abv = 1 {40 do 60 }
    var i = 1;
    for (i; i <= 51; i++) {
      var x = 25 + i;
      var avg: number;
      if (x >= 25 && x <= 75) {
        avg = (x - 40) / (75 - 25);      
      } 
      else if (x >= 40 && x <= 60) {
        avg = 1;
      } else if (x >= 60 && x <= 75) {
        avg = 0
              }
    }
    this.irrigation.push(2, avg);
    console.log('this.irrigation', this.irrigation)
  }

  termHigh() {
    //60- 101; 70-80;
    for(var i=1; i<41; i++){
      var x = 60 + i;
      if(x>=60 && x<101){
        var high = (x-70)/(80-70);
        this.irrigation.push(3, high);
      }
      else if (x>=80 && x< 101){
        this.irrigation.push(3, 1)
      }
      else {
        this.irrigation.push(3,0);
      }
    }
  }
}