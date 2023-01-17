import { Component, HostListener, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  constructor(private authService: AuthenticationService) {
  }

  isMobileRes: boolean;
  isShown = false;
  mobileRes = 768;

  isLoggedUser(): boolean {
    return this.authService.loggedUser();
  }

  logOut() {
    this.authService.logOut();
  }

  ngOnInit(): void {
    this.onResize();
  }

  /*DETECTS SCREEN WIDTH */
  @HostListener('window:resize')
  @HostListener('window:beforeunload')
  onResize(): void {
    const screenRes = window.innerWidth;
    if (screenRes <= this.mobileRes) {
      this.isMobileRes = true;
    } else {
      this.isMobileRes = false;
    }
  }

  /*SHOWS AND HIDES SIDE MENU*/
  public toggleSideMenu(): void {
    this.isShown = !this.isShown;
  }

}
