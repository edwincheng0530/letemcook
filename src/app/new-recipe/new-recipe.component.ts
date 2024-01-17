import { Component } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../header/header.component';
import { RecipeService } from '../services/recipe.service';
import { UsersService } from '../services/users.service';

import { FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms'
import { switchMap, catchError } from 'rxjs/operators'

@Component({
  selector: 'app-new-recipe',
  standalone: true,
  imports: [HeaderComponent, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css'
})
export class NewRecipeComponent {
  form: FormGroup

  constructor(private router: Router, private recipeService: RecipeService, private userService: UsersService) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      recipe: new FormControl('', [Validators.required]),
    })
  }

  submitForm(): void {
    // console.log(this.form.value);
    const email = this.userService.getEmail();
    // console.log(email);
    this.recipeService.newRecipe(email ,this.form.value.title, this.form.value.recipe)
      .pipe(
        switchMap(response => {
          console.log('Recipe successfully created:', response);
          // Additional logic if needed
          return this.userService.fetchAll(); // Assuming you want to fetch users after creating one
        }),
        catchError(error => {
          console.error('Error creating recipe:', error);
          // Handle error or display a message to the user
          throw error; // Rethrow the error to propagate it to the next error handler
        })
      )
      .subscribe(recipe => {
        console.log('Created recipe:', recipe);
        this.router.navigate(["/recipes"]);
      });
  }
}
