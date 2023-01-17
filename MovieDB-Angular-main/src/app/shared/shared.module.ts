import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './interceptors/http.interceptor';
import { ErrorHandlingInterceptor } from './interceptors/error-handling.interceptor';
import { ErrorPopupComponent } from './components/error-popup/error-popup.component';
import { ErrorService } from './services/error.service';
import { RoutingGuard } from "./guards/routing.guard";


@NgModule({
  declarations: [
    ErrorPopupComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [ ErrorPopupComponent ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptor,
      multi: true
    },
    ErrorService,
    RoutingGuard
  ]
})
export class SharedModule {
}
