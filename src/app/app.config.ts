import { ApplicationConfig, LOCALE_ID, importProvidersFrom  } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

// translate module
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// interceptors
import { jwtInterceptor } from './core/Interceptors/jwt.interceptor';
import { contentTypeInterceptor } from './core/Interceptors/content-type.interceptor';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { PoHttpRequestModule } from '@po-ui/ng-components';

export function translateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
     { provide: LOCALE_ID, useValue: 'pt-BR' },
      provideAnimations(),
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([contentTypeInterceptor, jwtInterceptor])
    ),
    importProvidersFrom(
      [PoHttpRequestModule],
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: translateLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ]
};