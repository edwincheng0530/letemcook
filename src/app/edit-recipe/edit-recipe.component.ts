import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../header/header.component';
import { RecipeService } from '../services/recipe.service';
import { UsersService } from '../services/users.service';

import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder} from '@angular/forms'
import { switchMap, catchError } from 'rxjs/operators'

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [HeaderComponent, RouterModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent {
  form!: FormGroup;
  idrecipe!: number;
  
  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService, private userService: UsersService, private formBuilder: FormBuilder) {
    // this.form = new FormGroup({
    //   title: new FormControl('', [Validators.required]),
    //   recipe: new FormControl('', [Validators.required]),
    // })
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      recipe: ['', Validators.required]
    });

    this.route.params.subscribe((params) => {
      this.idrecipe = +params['id'];

      this.recipeService.getRecipe(this.idrecipe).subscribe((recipe) => {
        if (recipe) {
          console.log(recipe);
          this.form.get('title')?.setValue(recipe[0].title);
          this.form.get('recipe')?.setValue(recipe[0].recipe);
        } else {
          console.log("Recipe not found");
        }
      });
    })
  }

  submitForm(): void {
    this.recipeService.updateRecipe(this.idrecipe, this.form.value.title, this.form.value.recipe)
    .pipe(
      switchMap(response => {
        console.log('Recipe successfully updated:', response);
        // Additional logic if needed
        return this.recipeService.getRecipe(this.idrecipe); // Assuming you want to fetch users after creating one
      }),
      catchError(error => {
        console.error('Error updating recipe:', error);
        // Handle error or display a message to the user
        throw error; // Rethrow the error to propagate it to the next error handler
      })
    )
    .subscribe(recipe => {
      console.log('Updated recipe:', recipe);
      this.router.navigate(["/recipes"]);
    });
  }

}
