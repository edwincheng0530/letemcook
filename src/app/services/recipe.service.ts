import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Recipe } from '../models/Recipe';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private url = 'http://localhost:3000/recipe';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  fetchAll(email: string): Observable<Recipe[]> {
    const new_url = `${this.url}?email=${email}`
    return this.http
      .get<Recipe[]>(new_url, { responseType: "json"})
      .pipe(
        tap((_) => console.log('fetched recipes')),
        catchError(
          this.errorHandlerService.handleError<Recipe[]>("fetchAll", [])
        )
      )
  }

  newRecipe(email: string, title: string, recipe: string): Observable<any> {
    return this.http.post<any>(this.url, {email: email, title: title, recipe: recipe}, this.httpOptions)
    .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  } 

}
