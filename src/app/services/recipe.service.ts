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

  updateRecipe(id: number, title: string, recipe: string): Observable<any> {
    return this.http.put<any>(this.url, {id: id, title: title, recipe: recipe}, this.httpOptions)
    .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  getRecipe(id: number) {
    const new_url = `${this.url}/edit?id=${id}`
    return this.http.get<Recipe[]>(new_url, { responseType: "json"})
    .pipe(
      tap((_) => console.log('got recipe')),
      catchError(
        this.errorHandlerService.handleError<Recipe[]>("getRecipe", [])
      )
    )
  }

  deleteRecipe(id: number): Observable<any> {
    const new_url = `${this.url}?id=${id}`
    return this.http.delete<any>(new_url, this.httpOptions)
    .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }

}
