import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';

import { HeaderComponent } from '../header/header.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Recipe } from '../models/Recipe';
import { RecipeService } from '../services/recipe.service';
import { UsersService } from '../services/users.service';

import { tap, catchError, switchMap, map, startWith, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent, ConfirmDialogComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);
  recipes$ = this.recipesSubject.asObservable();
  filteredRecipes$!: Observable<Recipe[]>;
  private searchSubject = new Subject<string>();
  showModal = false;
  recipeToDelete: number | null = null;

  constructor(private router: Router, private recipeService: RecipeService, private userService: UsersService) { }

  ngOnInit(): void {
    const email = this.userService.getEmail();
    // this.recipes$ = this.recipeService.fetchAll(email);
    this.recipeService.fetchAll(email).subscribe(
      recipes => this.recipesSubject.next(recipes)
    );

    const search$ = this.searchSubject.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged()
    );

    this.filteredRecipes$ = combineLatest([
      this.recipes$,
      search$
    ]).pipe(
      map(([recipes, searchTerm]) => {
        if (!searchTerm.trim()) {
          return recipes;
        }
        const searchLower = searchTerm.toLowerCase();
        return recipes.filter(recipe => 
          recipe.title.toLowerCase().includes(searchLower)
        );
      })
    );
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchTerm);
  }

  // Handle enter key press
  onSearchKeyup(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const searchTerm = (event.target as HTMLInputElement).value;
      this.searchSubject.next(searchTerm);
    }
  }

  editRecipe(idrecipe: number) {
    this.router.navigate(['/recipes', idrecipe, 'edit']);
  }

  deleteRecipe(idrecipe: number) {
    this.recipeToDelete = idrecipe; // Set the recipe ID for deletion
    this.showModal = true; // Show the confirmation modal
  }

  onConfirmDelete() {
    if (this.recipeToDelete !== null) {
      this.recipeService.deleteRecipe(this.recipeToDelete).pipe(
        switchMap(() => this.recipeService.fetchAll(this.userService.getEmail())),
        catchError(error => {
          console.error('Error deleting recipe:', error);
          return throwError(() => error);
        })
      ).subscribe({
        next: (recipes) => {
          // Update the BehaviorSubject with new recipes
          this.recipesSubject.next(recipes);
          this.showModal = false;
          this.recipeToDelete = null;
        },
        error: (error) => {
          console.error('Error updating recipes:', error);
          // Handle error (maybe show an error message to user)
        }
      });
    }
  }

  onCancelDelete() {
    this.showModal = false; // Close the modal without deleting
    this.recipeToDelete = null; // Clear the recipe ID
  }
}