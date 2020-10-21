import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './authen.interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

/*
    If you provide interceptors A, then B, then C
    requests flow in A->B->C
    responses flow out C->B->A
*/