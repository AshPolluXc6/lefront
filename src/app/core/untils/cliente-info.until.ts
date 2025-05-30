export interface ClientInfo {
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  language: string;
  timezone: string;
  latitude?: number;
  longitude?: number;
}

export class ClientInfoUtil {
  static async getClientInfo(): Promise<ClientInfo> {
    const userAgent = navigator.userAgent;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const language = navigator.language;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    let latitude: number | undefined;
    let longitude: number | undefined;

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          maximumAge: 10000,
          timeout: 5000
        });
      });
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    } catch (error) {
      console.warn('Geolocalização não disponível ou negada.');
    }

    return {
      userAgent,
      screenWidth,
      screenHeight,
      language,
      timezone,
      latitude,
      longitude
    };
  }
}
