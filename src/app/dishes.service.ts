import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  constructor(private httpClient: HttpClient) { }

  getDishes() {
    return this.httpClient.get('http://localhost:3000/dishes')
      .pipe(
        catchError(this.handleError),
        retry(3),
      );
  }

  handleError(error: HttpErrorResponse) {
    console.log('errr');
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
