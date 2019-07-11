import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AppConfig } from '../../share';
import { User, Response } from '../../models';
import { UtilsService } from '../../service';

import { Observable, of, BehaviorSubject, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginStatus$ = new BehaviorSubject<boolean>(false);
  currentUser$ = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private appConfig: AppConfig, private utils: UtilsService) { }
  loginServer(loginData): Observable<Response> {
    const username = loginData.username.trim();
    const password = loginData.password.trim();
    return this.http.post<Response>(this.appConfig.apiUrl + '/users/authenticate', { username: username, password: password });
  }
  login(loginData): Observable<boolean> {
    return this.loginServer(loginData).pipe(
      map((res: Response) => {
        if(res.success) {
          this.loginStatus$.next(true);
          this.currentUser$.next(loginData.username);
          if(loginData.rememberMe) {
            this.utils.writeToken(res.payload);
          }
          return true;
        } else {
          console.log('can not login');
          return false;
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('client-side error');
        } else {
          console.log('server-side error');
        }
        return of(false);
      })
    )
  }
  logout() {
    this.loginStatus$.next(false);
    this.currentUser$.next(null);
    this.utils.removeToken();
  }
  getLoginStatus(): Observable<boolean> {
    return this.loginStatus$;
  }
  getCurrentUser(): Observable<User> {
    return this.currentUser$;
  }
  checkUser(): Observable<boolean> {
    if(!this.utils.isTokenExpired()) {
      this.loginStatus$.next(true);
      this.getUser();
      return of(true);
    } else {
      console.log('no token or token is expired');
      this.utils.removeToken();
      return of(false);
    }
  }

  //get user from server
  getUserFromServer(): Observable<User> {
    if(!this.utils.isTokenExpired()) {
      const token = this.utils.getToken();
      return this.http.post(`${this.appConfig.apiUrl}/users/currentUser`, { 'token': token}).pipe(
        map((res: Response) => {
          if (res.success) {
            return res.payload;
          } else {
            return null;
          }
        })
      )
    }
  }
  getUser() {
    this.getUserFromServer()
        .subscribe(res => {
          this.currentUser$.next(res);
        }, (err: HttpErrorResponse) => {
          if(err.error instanceof Error) {
            console.log('clent-side error');
          } else {
            console.log('server-side error');
          }
        })
  }
}
