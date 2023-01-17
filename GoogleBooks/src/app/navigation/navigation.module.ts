import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainNavComponent,
    SideMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MainNavComponent,
    SideMenuComponent
  ]
})
export class NavigationModule {
}

