import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VolumesModule } from './volume/volumes.module';
import { SharedModule } from './shared/shared.module';
import { NavigationModule } from './navigation/navigation.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomRouteReuseStrategy } from './route-strategy';
import { RouteReuseStrategy } from '@angular/router';
import { ErrorModalComponent } from './shared/error-catch/components/error-modal/error-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    VolumesModule,
    SharedModule,
    NavigationModule,
    NgbModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    }
  ],
  entryComponents: [ErrorModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
