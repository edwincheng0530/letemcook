import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form: FormGroup

  constructor(private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    {
      validators: this.passwordMatch
    });
  }

  submitForm() {
    console.log(this.form);
    this.router.navigate(["home"]);
  }

  passwordMatch(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : {mismatch:true};
  }
}
