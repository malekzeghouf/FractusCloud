import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  numberOne: number = 0;
  numberTwo: number = 0;
  numberThree: number = 0;

  ngOnInit(): void {
    this.generateRandomNumbers();
  }

  generateRandomNumbers(): void {
    const time = 30;
    let i = 0;

    const loop3 = setInterval(() => {
      if (i > 40) {
        clearInterval(loop3);
        this.numberThree = 4;
      } else {
        this.numberThree = this.randomNum();
        i++;
      }
    }, time);

    const loop2 = setInterval(() => {
      if (i > 80) {
        clearInterval(loop2);
        this.numberTwo = 0;
      } else {
        this.numberTwo = this.randomNum();
        i++;
      }
    }, time);

    const loop1 = setInterval(() => {
      if (i > 100) {
        clearInterval(loop1);
        this.numberOne = 4;
      } else {
        this.numberOne = this.randomNum();
        i++;
      }
    }, time);
  }

  randomNum(): number {
    return Math.floor(Math.random() * 9) + 1;
  }


}
