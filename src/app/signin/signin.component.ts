import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';
import { User } from '../models/User'


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{
  users$!: Observable<User[]>;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.users$ = this.userService.fetchAll();
  }
}
