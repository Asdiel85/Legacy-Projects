import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  canActivate(): boolean {
    if (this.authService.loggedUser()) {
      this.router.navigate(['volumes']);
      return false;
    } else {
      return true;
    }
  }
}
