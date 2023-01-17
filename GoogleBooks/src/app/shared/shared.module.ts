import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripHtmlPipe } from './pipes/html-strip.pipe';
import { AuthenticationGuard } from '../authentication/guards/authentication-guard';
import { UserGuard } from '../authentication/guards/user-guard';
import { ErrorModalComponent } from './error-catch/components/error-modal/error-modal.component';
import { CatchErrorInterceptor } from './error-catch/interceptors/catch-error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorService } from './error-catch/services/error-service';

@NgModule({
  declarations: [
    StripHtmlPipe,
    ErrorModalComponent
  ],
  exports: [
    StripHtmlPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AuthenticationGuard,
    UserGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchErrorInterceptor,
      multi: true
    },
    ErrorService
  ]
})
export class SharedModule {
}
