import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home-body',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home-body.component.html',
  styleUrl: './home-body.component.css'
})
export class HomeBodyComponent {
  constructor(private userService: UsersService) { }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}
