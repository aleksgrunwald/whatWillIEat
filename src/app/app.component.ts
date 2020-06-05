import {Component, OnInit} from '@angular/core';
import {DishesService} from './dishes.service';
import {Dish} from './dish';
import {catchError, map, take} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  // clickedButton: boolean = false;
  waitingForADish: boolean = false;

  dishes: Dish[] = [];
  // dish: Dish;
  randomThreeDishes: Dish[];
  getErrorMsg: string;

  constructor(private dishesService: DishesService) {
  }

  generateRandomNumber(arrLength) {
    return Math.floor(Math.random() * arrLength);
  }

  getRandomDish() {
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
          this.clearDishInfo();
          this.dishes.push(data);
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

  findThreeDishes() {
    this.clearDishInfo();
    this.waitingForADish = true;
    this.dishesService.getDishes()
      .pipe(
        map(data => {
          const threeRandomDishes: Dish[] = [];
          for (let i = 0; i < 3; i++) {
            threeRandomDishes.push(data[this.generateRandomNumber(Object.keys(data).length)]);
          }
          return threeRandomDishes;
        })
      )
      .subscribe(
        data => {
          this.dishes = data;
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
    // window.open('http://google.com/search?q=' + this.dish.name);
    window.open('https://www.google.com/search?tbm=isch&q=' + this.dishes[0].name);
  }

  clearDishInfo() {
    this.dishes = [];
  }

}
