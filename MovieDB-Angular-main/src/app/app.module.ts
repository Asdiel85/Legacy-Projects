import { AppComponent } from './app.component';
/*MODULES*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavigationModule } from './navigation/navigation.module';
import { AppRoutesModule } from './app.routes.module';
import { MovieModule } from './movie/movie.module';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationModule } from './user/registration.module';
import { SharedModule } from './shared/shared.module';
import { ErrorPopupComponent } from './shared/components/error-popup/error-popup.component';
/*SERVICES*/
import {MovieService} from './movie/service/movie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NavigationModule,
    AppRoutesModule,
    MovieModule,
    RegistrationModule,
    SharedModule,
    NgbModule
  ],
  providers: [
    MovieService,
  ],
  entryComponents: [ ErrorPopupComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
