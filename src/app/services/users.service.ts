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
  private url = "http://localhost:3000/users/";
  private loginUrl = 'http://localhost:3000/login/';

  private logged_user: string;
  private token: string;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json"})
  }

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { 
    this.logged_user = this.getUserFromLocalStorage();
    this.token = this.getTokenFromLocalStorage();
  }

  private getUserFromLocalStorage(): any {
    if(typeof window == 'undefined') {
      return '';
    }
    return localStorage.getItem('user') || '';
  }

  private getTokenFromLocalStorage(): string {
    if(typeof window == 'undefined') {
      return '';  
    }
    return localStorage.getItem('userToken') || '';
  }

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

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, {email: email, password: password}, this.httpOptions)
    .pipe(catchError(this.errorHandlerService.handleError<any>("login")))
  }

  setUser(response: any): void {
    this.logged_user = response.user.email;
    this.token = response.token;
    localStorage.setItem('userToken', this.token);
    localStorage.setItem('user', this.logged_user);
  }

  clearUser(): void {
    this.logged_user = '';
    this.token = '';
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
  }

  getEmail(): string {
    return this.logged_user;
  }

  isLoggedIn(): boolean {
    return !!this.logged_user && !!this.token;
  }
}
