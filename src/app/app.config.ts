import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors  } from '@angular/common/http';
import { jwtInterceptor } from './core/Interceptors/jwt.interceptor';
import { contentTypeInterceptor } from './core/Interceptors/content-type.interceptor';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([contentTypeInterceptor, jwtInterceptor])
    ),
  ]
};
