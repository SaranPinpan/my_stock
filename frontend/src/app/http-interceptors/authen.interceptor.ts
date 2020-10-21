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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJGb3IgVGVzdGluZyIsImlkIjoiMiIsInVzZXJuYW1lIjoiaWJsdXJibHVyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQ2FzaGllciIsImVtYWlsIjoiaWJsdXJibHVyQGRldi5jb20iLCJleHAiOjE2MDU4Mzc5OTYsImlzcyI6IkNvZGVNb2JpbGVzIEx0ZCIsImF1ZCI6Imh0dHA6Ly9jb2RlbW9iaWxlcy5jb20ifQ.u9elrdfxi6lLK-lUVdZFKgvNBl-Q6hrQfzJlLHUYrdc';

    const headers = request.headers
      .set('Authorization', `Bearer ${token}`);

    const authReq = request.clone({ headers });
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          alert("UnAuthen");
        } else {
          return throwError(error);
        }
      })
    );
  }
}