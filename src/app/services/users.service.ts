import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = "http://localhost:3000/users/"
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json"})
  }

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  fetchAll(): Observable<User[]> {
    return this.http
      .get<User[]>(this.url, { responseType: "json"})
      .pipe(
        tap((_) => console.log('fetched users')),
        catchError(
          this.errorHandlerService.handleError<User[]>("fetchAll", [])
        ));
  }

  post(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.url, {email: email, password: password}, this.httpOptions)
    .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }
}
