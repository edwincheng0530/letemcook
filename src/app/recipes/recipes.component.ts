import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { HeaderComponent } from '../header/header.component';
import { Recipe } from '../models/Recipe';
import { RecipeService } from '../services/recipe.service';
import { UsersService } from '../services/users.service';

import { tap, catchError, switchMap} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  recipes$!: Observable<Recipe[]>;

  constructor(private router: Router, private recipeService: RecipeService, private userService: UsersService) { }

  ngOnInit(): void {
    const email = this.userService.getEmail();
    this.recipes$ = this.recipeService.fetchAll(email);
  }

  editRecipe(idrecipe: number) {
    this.router.navigate(['/recipes', idrecipe, 'edit']);
  }

  deleteRecipe(idrecipe: number) {
    this.recipeService.deleteRecipe(idrecipe).pipe(
      switchMap(response => {
        console.log('Recipe successfully deleted:', response);
        return this.recipeService.fetchAll(this.userService.getEmail()); // Assuming you want to fetch users after creating one
      }),
      catchError(error => {
        console.error('Error deleting recipe:', error);
        throw error; // Rethrow the error to propagate it to the next error handler
      })
    )
    .subscribe(recipe => {
      console.log('Deleted recipe:', recipe);
    });
    // const email = this.userService.getEmail();
    // this.recipes$= this.recipeService.fetchAll(email);
  }

}

// deleteRecipe(idrecipe: number): void {
//   this.recipes$ = this.recipeService.deleteRecipe(idrecipe)
//   .pipe(tap(() => (this.recipes$ = this.recipeService.fetchAll(this.userService.getEmail()))));
// }