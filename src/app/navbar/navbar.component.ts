import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from '../user/service/user.service';
import { User } from '../models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  login$: Observable<boolean>;
  user$: Observable<User>;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.login$ = this.userService.getLoginStatus();
    this.user$ = this.userService.getCurrentUser();
  }
  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
