import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenService } from './authen.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenService: AuthenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem('token') ? sessionStorage.getItem('token') : sessionStorage.getItem('token')}`
        }
      });
    return next.handle(request);
  }
}
