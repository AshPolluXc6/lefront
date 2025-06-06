import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class StorageService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
   private readonly CLIENT_INFO_KEY = 'client_info';

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  setTokens(access: string, refresh: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, access);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refresh);
  }

  clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

   setClientInfo(clientInfo: any): void {
    localStorage.setItem(this.CLIENT_INFO_KEY, JSON.stringify(clientInfo));
  }

  getClientInfo(): any {
    const data = localStorage.getItem(this.CLIENT_INFO_KEY);
    return data ? JSON.parse(data) : null;
  }

}