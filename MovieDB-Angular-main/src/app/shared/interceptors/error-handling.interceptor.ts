import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';


@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 400) {
          this.errorService.displayError('Invalid Email or Password');
        } else if (err instanceof HttpErrorResponse) {
          this.errorService.displayError(
            `Oops Something went wrong! ${err.status}`);
        }
        return throwError(
          'Oops Something went wrong!');
      })
    );
  }
}
