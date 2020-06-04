import { Component, OnInit } from '@angular/core';
import { DishesService } from './dishes.service';
import {Dish} from './dish';
import {catchError, map, take} from 'rxjs/operators';
import {of} from 'rxjs';

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
        catchError(err => {
          console.log('component error caught::  ' + err);
          return of([err]);
        }),
        map(data => data[this.generateRandomNumber(Object.keys(data).length)])
      )
      .subscribe(
        data => {
          if (data == null) {
            console.log('EMPTY dataaa');
          }
          console.log('success front');
          this.dish = data;
        },
        error => {
          console.log('err front::  ' + error);
          this.waitingForADish = false;
          this.getErrorMsg = error;
          },
        () => {
          console.log('complete front');
          this.waitingForADish = false;
        }
      );
  }

  searchRecipeGoogle() {
    window.open('http://google.com/search?q=' + this.dish.name);
  }

  clearDishInfo() {
    this.clickedButton = false;
  }

}
