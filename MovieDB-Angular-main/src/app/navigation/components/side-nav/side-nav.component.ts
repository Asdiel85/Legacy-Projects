import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  constructor(private authService: AuthenticationService) {
  }

  logOut(): void {
    this.authService.logOut();
  }

  isLoggedUser(): boolean {
   return this.authService.loggedUser()
  }
}
