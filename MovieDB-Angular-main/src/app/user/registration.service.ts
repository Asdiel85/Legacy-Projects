import { Injectable } from '@angular/core';
import { IUser } from './models/user';
import { HttpClient } from '@angular/common/http';
import { AUTH_ROUTE_REGISTER } from '../constants/constants';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private success: boolean;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  register(item: IUser) {
    return this.http.post<void>(`${AUTH_ROUTE_REGISTER}`, JSON.stringify(item));
  }

}
