import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';

import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router, private userService: UsersService, private route: ActivatedRoute, private viewportScroller: ViewportScroller) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['section']) {
        this.scrollTo(params['section']);
      }
    });
  }

  scrollTo(section: string) {
    setTimeout(() => {
      this.viewportScroller.scrollToAnchor(section);
    }, 10);
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  logout(): void {
    this.userService.clearUser();
    this.router.navigate(["home"]);
  }
}
