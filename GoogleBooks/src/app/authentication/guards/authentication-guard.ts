import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  canActivate(): boolean {
    if (this.authService.loggedUser()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
