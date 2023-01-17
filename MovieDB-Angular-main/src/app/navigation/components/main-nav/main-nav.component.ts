import { Component, HostListener, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication/services/authentication.service';



@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})

export class MainNavComponent implements OnInit {
  isMobileRes: boolean;
  isShown = false;
  mobileRes = 768;


  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.onResize();
  }
  isLoggedUser(): boolean {
    return this.authService.loggedUser();
  }

  logOut() {
    this.authService.logOut();
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

  /*SHOWS AND HIDES McDONALD'S :) MENU*/
  public toggleSideMenu(): void {
    this.isShown = !this.isShown;
  }
}
