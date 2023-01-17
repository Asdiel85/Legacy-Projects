import { Injectable } from '@angular/core';
import { ErrorService } from '../services/error-service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 400) {
          this.errorService.displayError('Invalid request, please check your credentials!');
        } else if (err instanceof HttpErrorResponse) {
          this.errorService.displayError(
            `Oops Something went wrong! ${err.status}`);
        }
        return throwError(`Oops Something went wrong!`);
      })
    );
  }
}
