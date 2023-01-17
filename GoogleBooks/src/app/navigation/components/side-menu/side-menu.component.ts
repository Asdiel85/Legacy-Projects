import { Component } from '@angular/core';
import { AuthenticationService } from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  localId = this.authService.getUserId();

  constructor(private authService: AuthenticationService) {
  }

  logOut(): void {
    this.authService.logOut();
  }

  isLoggedUser(): boolean {
    return this.authService.loggedUser();
  }

}
