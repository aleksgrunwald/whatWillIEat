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
      .subscribe(data => this.dish = data
      );
    this.waitingForADish = false;
  }

  clearDishInfo() {
    this.clickedButton = false;
  }

}
