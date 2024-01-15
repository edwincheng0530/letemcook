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

  constructor(private recipeService: RecipeService, private userService: UsersService) { }

  ngOnInit(): void {
    const email = this.userService.getEmail();
    console.log('what am i getting back bruh', this.recipeService.fetchAll(email));
    this.recipes$ = this.recipeService.fetchAll(email);
  }

}
