import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_KEY, API_URL, AUTH_API_URL, AUTH_KEY } from '../../constants/constants';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const params: HttpParams = new HttpParams().set('api_key', API_KEY);
    const requestMethod = request.method;
    if (requestMethod === 'GET') {
      return next.handle(request.clone({url: `${API_URL}/${request.url}`, params}));
    } else if (requestMethod === 'POST') {
      return next.handle(request.clone({url: `${AUTH_API_URL}/${request.url}${AUTH_KEY}`}));
    }
  }

}
