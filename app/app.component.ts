import {
  Component
} from '@angular/core';
import {
  MatSliderChange
} from '@angular/material';
@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  value: number = 1;
  sliderValue: number;

  timeLeft: number;
  interval: any;
  //values for fuzzy

  avgValue = new Array();

  //end of fuzzy values
  iArr = new Array();
  startTimer() {
    this.timeLeft = this.sliderValue;
    this.interval = setInterval(() => {
      if (this.timeLeft > 1) {
        this.timeLeft--;
        this.value++;

        this.termAvg();
      }
    }, 1000)
  }
  onInputChange(event: MatSliderChange) {
    this.sliderValue = event.value;
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  termAvg() {
    //25 do 75, abv = 1 {40 do 60 }
    var i = 1;
    for (i; i <= 51; i++) {
      var x = 25 + i;
      if (x >= 25 && x <= 75) {
        var toPush = (x - 40) / (75 - 25);
        this.avgValue.push(2, toPush);
        this.iArr.push(x);
      } else if (x >= 40 && x <= 60) {
        this.avgValue.push(2, 1);
      } else {
        this.avgValue.push(2, 1);
      }
    }
    if(this.timeLeft<1){
    console.log('this.iArr', this.iArr);
    console.log('this.avgValue', this.avgValue);
    }
  }

}