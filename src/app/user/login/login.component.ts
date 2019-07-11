import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.pattern('^[a-zA-Z0-9-_]{5,20}')],
      password: ['', Validators.pattern('^[a-zA-Z0-9-_]{5,20}')],
      rememberMe: [true]
    });
  }
  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }
  get remamberMe() { return this.form.get('remamberMe'); }


  login() {
    this.userService.login(this.form.value)
        .subscribe(res => {
          if(res) {
            this.snackbar.open('Login Success', 'OK', { duration: 3000 });
            this.router.navigate(['/member']);
          } else {
            this.snackbar.open('Check Username and password', 'OK', { duration: 3000 });
          }
        })
  }
}
