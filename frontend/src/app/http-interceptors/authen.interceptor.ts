import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    const headers = request.headers
      .set('Authorization', `Bearer ${token}`);

    const authReq = request.clone({ headers });
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          this.authService.clearToken();
          this.router.navigate(['login']);
        } else {
          return throwError(error);
        }
      })
    );
  }
}