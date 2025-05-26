import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, of, timer, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthService {
  private refreshSubscription?: Subscription;
  private refreshTimeout: any;
  private readonly API_URL = '/api'
//   private readonly REFRESH_URL = 'http://191.252.185.72:9000/refresh';
  public isRefreshing = false;
  public refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {}

    getAccessToken(): string | null {
        return this.storage.getAccessToken();
    }

    getRefreshToken(): string | null {
        return this.storage.getRefreshToken();
    }

  login(credentials: { user: string; pass: string }) {
    return this.http.post<{ access_token: string; refresh_token: string }>(
       `${this.API_URL}/login`,
      credentials
    ).pipe(
      tap(({ access_token, refresh_token }) => {
        this.storage.setTokens(access_token, refresh_token);
        this.scheduleTokenRefresh();
      })
    );
  }

  logout() {
    this.storage.clearTokens();
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }
  }

  private scheduleTokenRefresh() {
    const accessToken = this.storage.getAccessToken();
    if (!accessToken) return;

    const expiresIn = this.getTokenExpiration(accessToken) - Date.now() - 60000; // 1 minuto antes da expiração

    if (expiresIn > 0) {
      if (this.refreshSubscription) {
        this.refreshSubscription.unsubscribe();
      }
      this.refreshSubscription = timer(expiresIn).pipe(
        switchMap(() => this.refreshToken())
      ).subscribe();
    }
  }

  refreshToken() {
    const refreshToken = this.storage.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      return of(null);
    }

    return this.http.post<{ access_token: string; refresh_token: string }>('/api/refresh', { refresh_token: refreshToken }).pipe(
      tap(({ access_token, refresh_token }) => {
        this.storage.setTokens(access_token, refresh_token);
        this.scheduleTokenRefresh();
      }),
      catchError(() => {
        this.logout();
        return of(null);
      })
    );
  }

  private getTokenExpiration(token: string): number {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000;
    } catch (e) {
      return 0;
    }
  }
}