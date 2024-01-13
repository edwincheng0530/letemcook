import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router, private userService: UsersService) { }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  logout(): void {
    this.userService.clearUser();
    this.router.navigate(["home"]);
  }
}
