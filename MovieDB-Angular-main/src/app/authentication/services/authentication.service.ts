import { EventEmitter, Injectable, Output } from '@angular/core';
import { IUser } from '../../user/models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequestModel } from '../models/login';
import { AUTH_ROUTE_LOGIN, TOKEN } from '../../constants/constants';

import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userState: IUser = null;
  @Output() public userChanged: EventEmitter<IUser | null> = new EventEmitter();

  constructor(private http: HttpClient,
              private router: Router) {
  }

  set user(user: IUser | null) {
    this.userState = user;
    this.userChanged.emit(this.userState);
  }

  authenticate(model: LoginRequestModel): void {
    this.http.post<IUser>(`${AUTH_ROUTE_LOGIN}`, JSON.stringify(model))
      .pipe(take(1)).subscribe(response => {
      localStorage.setItem(TOKEN, response.idToken);
      this.user = response;
      this.router.navigate(['/popular']);
    });
  }

  logOut(): void {
    localStorage.removeItem(TOKEN);
    this.user = null;
  }

  loggedUser(): boolean {
    return !!localStorage.getItem(TOKEN);
  }
}
