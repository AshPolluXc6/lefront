// src/app/core/interceptors/jwt.interceptor.ts
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  const accessToken = auth.getAccessToken();
  const authReq = accessToken
    ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(authReq, next, auth);
      }
      return throwError(() => error);
    })
  );
};

function handle401Error(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  auth: AuthService
): Observable<HttpEvent<unknown>> {
  
  if (!auth.isRefreshing) {
    auth.isRefreshing = true;
    auth.refreshTokenSubject.next(null);

    return auth.refreshToken().pipe(
      switchMap((tokens) => {

        if (!tokens || !tokens.access_token) {
           auth.isRefreshing = false;
          auth.logout();
          return throwError(() => new Error('Failed to refresh token'));
        }

        auth.isRefreshing = false;
        auth.refreshTokenSubject.next(tokens?.access_token || null);

        const newAccessToken = auth.getAccessToken();
        const newRequest = newAccessToken
          ? request.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`
              }
            })
          : request;

        return next(newRequest);
      }),
      catchError(err => {
        auth.isRefreshing = false;
        auth.logout();
        return throwError(() => err);
      })
    );
  } else {
    return auth.refreshTokenSubject.pipe(
      switchMap(token => {
        if (token) {
          const newRequest = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
          return next(newRequest);
        }
        return throwError(() => new Error('No token available'));
      })
    );
  }
}
