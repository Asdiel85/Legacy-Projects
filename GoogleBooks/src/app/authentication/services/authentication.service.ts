import { EventEmitter, Injectable, Output } from '@angular/core';
import { LoginRequestModel } from '../models/login';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from '../user/models/user';
import { AUTH_API, AUTH_API_KEY, AUTH_ROUTE, KEY_PARAM, LOCAL_ID, TOKEN } from '../../constants/constants';

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
    this.http.post<IUser>(`${AUTH_API}${AUTH_ROUTE}${KEY_PARAM}${AUTH_API_KEY}`, JSON.stringify(model))
      .pipe(take(1)).subscribe(response => {
      localStorage.setItem(TOKEN, response.idToken);
      localStorage.setItem(LOCAL_ID, response.localId);
      this.user = response;
      this.router.navigate(['volumes']);
    });
  }

  logOut(): void {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(LOCAL_ID);
    this.user = null;
    this.router.navigateByUrl('volumes');
  }

  getUserId(): string {
    return localStorage.getItem(LOCAL_ID);
  }

  loggedUser(): boolean {
    return !!localStorage.getItem(TOKEN);
  }
}
