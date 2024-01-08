import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { HomeBodyComponent } from '../home-body/home-body.component';
import { HomeAboutComponent } from '../home-about/home-about.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ 
    CommonModule, RouterOutlet, RouterModule,
    HeaderComponent, 
    HomeBodyComponent,
    HomeAboutComponent,
    FooterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
