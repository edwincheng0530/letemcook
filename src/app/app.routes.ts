import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

// export const routes: Routes = [];
export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'home', component: HomepageComponent},
    {path: 'register', component: SignupComponent},
    {path: 'signin', component: SigninComponent},
]