import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, from, map, of, catchError } from 'rxjs';

export interface ClientInfo {
  ip: string;
  latitude?: number;
  longitude?: number;
  deviceType: string;
  browser: string;
  os: string;
  userAgent: string;
}

@Injectable({ providedIn: 'root' })
export class ClientInfoUtil {

  constructor(private http: HttpClient) {}

  getClientInfo() {
    return forkJoin({
      ip: this.getPublicIP(),
      geo: this.getGeoLocation(),
    }).pipe(
      map(({ ip, geo }): ClientInfo => {
        const userAgent = navigator.userAgent;
        const deviceType = this.getDeviceType(userAgent);
        const browser = this.getBrowser(userAgent);
        const os = this.getOS(userAgent);

        return {
          ip,
          latitude: geo?.latitude,
          longitude: geo?.longitude,
          deviceType,
          browser,
          os,
          userAgent,
        };
      })
    );
  }

  
  private getPublicIP() {
    return this.http.get<any>('https://api.ipify.org?format=json').pipe(
      map(res => res.ip),
      catchError(() => of('Unavailable'))
    );
  }

  
  private getGeoLocation() {
    if (!navigator.geolocation) {
      return of(undefined);
    }

    return from(
      new Promise<{ latitude: number; longitude: number } | undefined>((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.warn('Geolocation error:', error);
            resolve(undefined); 
          },
          { timeout: 5000 }
        );
      })
    );
  }

  private getDeviceType(userAgent: string): string {
    if (/mobile/i.test(userAgent)) return 'Mobile';
    if (/tablet/i.test(userAgent)) return 'Tablet';
    if (/smart-tv|smarttv|googletv|appletv|hbbtv/i.test(userAgent)) return 'Smart TV';
    return 'Desktop';
  }

  private getBrowser(userAgent: string): string {
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Edg')) return 'Edge';
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
    if (userAgent.includes('OPR') || userAgent.includes('Opera')) return 'Opera';
    return 'Unknown';
  }

  private getOS(userAgent: string): string {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac OS')) return 'MacOS';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('Linux')) return 'Linux';
    if (/iPhone|iPad|iPod/.test(userAgent)) return 'iOS';
    return 'Unknown';
  }
}
