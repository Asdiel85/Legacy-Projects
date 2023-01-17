import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    MainNavComponent,
    SideNavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    MainNavComponent,
    SideNavComponent,
  ]
})
export class NavigationModule { }
