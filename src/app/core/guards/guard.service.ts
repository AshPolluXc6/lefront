import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const anonymousToken = localStorage.getItem('anonymousToken');

    // 🔒 Protege rota admin
    if (this.router.url.startsWith('/admin')) {
      if (accessToken) {
        return true;
      } else {
        return this.router.parseUrl('/login');
      }
    }

    // 🔓 Protege rota home e rota raiz
    if (this.router.url === '/' || this.router.url.startsWith('/home')) {
      if (refreshToken || anonymousToken) {
        return true;
      } else {
        return this.router.parseUrl('/login');
      }
    }

    return true;
  }
}
