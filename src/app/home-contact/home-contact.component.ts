import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home-contact.component.html',
  styleUrl: './home-contact.component.css'
})
export class HomeContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      // Here you would typically send the form data to a backend service
      // For now, we'll just log it to the console
      this.contactForm.reset();
    }
  }
}