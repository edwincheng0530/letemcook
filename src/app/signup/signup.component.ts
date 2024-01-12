import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms'
import { UsersService } from '../services/users.service';
import { switchMap, catchError } from 'rxjs/operators'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form: FormGroup

  constructor(private router: Router, private userService: UsersService) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    {
      validators: this.passwordMatch
    });
  }

  submitForm(): void {
    this.userService.post(this.form.value.email, this.form.value.password)
      .pipe(
        switchMap(response => {
          console.log('User successfully created:', response);
          // Additional logic if needed
          return this.userService.fetchAll(); // Assuming you want to fetch users after creating one
        }),
        catchError(error => {
          console.error('Error creating user:', error);
          // Handle error or display a message to the user
          throw error; // Rethrow the error to propagate it to the next error handler
        })
      )
      .subscribe(users => {
        // Handle the result of the fetchAll() operation if needed
        console.log('Fetched users:', users);
      });
    this.router.navigate(["signin"]);
  }

  passwordMatch(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : {mismatch:true};
  }
}
