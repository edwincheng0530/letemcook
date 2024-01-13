import { Component } from '@angular/core';

import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

}
