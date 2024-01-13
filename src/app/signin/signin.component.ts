import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';
import { User } from '../models/User'

import { FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { tap, catchError, switchMap} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{
  users$!: Observable<User[]>;
  form: FormGroup

  constructor(private router: Router, private userService: UsersService) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.users$ = this.userService.fetchAll();
  }

  loginForm(): void {
    this.userService.login(this.form.value.email, this.form.value.password)
    .pipe(
      tap((response: HttpResponse<any>) => {
        // Handle successful login (e.g., navigate to a new page)
        console.log('Login successful:', response);
        if(response) {
          this.router.navigate([""]);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle login error (e.g., display an error message)
        if (error.status === 401) {
          console.error('Unauthorized - Invalid credentials');
        } else {
          console.error('Login failed:', error);
        }
        return throwError(error); // Re-throw the error to propagate it to the next error handler
      })
    )
    .subscribe();
  }

  // loginForm(): void {
  //   this.userService.login(this.form.value.email, this.form.value.password)
  //   .pipe(
  //     switchMap(response => {
  //       console.log('User successfully logged in:', response);
  //       // Additional logic if needed
  //       return this.userService.fetchAll(); // Assuming you want to fetch users after creating one
  //     }),
  //     catchError(error => {
  //       console.error('Error logging in user:', error);
  //       // Handle error or display a message to the user
  //       throw error; // Rethrow the error to propagate it to the next error handler
  //     })
  //   )
  //   .subscribe(users => {
  //     // Handle the result of the fetchAll() operation if needed
  //     console.log('Fetched users:', users);
  //   });
  // }
}
