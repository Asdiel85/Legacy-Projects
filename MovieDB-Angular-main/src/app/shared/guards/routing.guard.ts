import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Injectable()
export class RoutingGuard implements CanActivate {
    constructor(private authService: AuthenticationService,
                private router: Router) {
    }
    canActivate(): boolean {
      if (this.authService.loggedUser()) {
        this.router.navigate(['popular']);
        return false;
      } else {
        return true;
      }
    }
}
