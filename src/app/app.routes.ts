import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

// export const routes: Routes = [];
export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'home', component: HomepageComponent},
    {path: 'register', component: SignupComponent},
    {path: 'signin', component: SigninComponent},
    {path: 'recipes', component: RecipesComponent},
    {path: 'new_recipe', component: NewRecipeComponent},
    {path: 'recipes/:id/edit', component: EditRecipeComponent}
]