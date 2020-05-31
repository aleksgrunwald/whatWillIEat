import { Component, OnInit } from '@angular/core';
import { DishesService } from './dishes.service';
import {Dish} from './dish';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  clickedButton: boolean = false;
  waitingForADish: boolean = false;

  // dishes: Dish[];
  dish: Dish;
  getErrorMsg: string

  constructor(private dishesService: DishesService) {}

  generateRandomNumber(arrLength) {
    return Math.floor(Math.random() * arrLength);
  }

  getRandomDish() {
    this.clickedButton = true;
    this.waitingForADish = true;
    this.dishesService.getDishes()
      .pipe(
        map(data => {
          return data[this.generateRandomNumber(Object.keys(data).length)];
        })
      )
      .subscribe(
        data => {
          console.log('success front');
          this.dish = data;
        },
        err => {
          console.log('err front');
          this.waitingForADish = false;
          this.getErrorMsg = err;
          console.log(err);
          },
        () => {
          console.log('complete front');
          this.waitingForADish = false;
        }
      );
  }

  clearDishInfo() {
    this.clickedButton = false;
  }

}
