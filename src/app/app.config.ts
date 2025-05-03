// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom }       from '@angular/core';
import { BrowserAnimationsModule }                     from '@angular/platform-browser/animations';
import { provideRouter }                               from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule }              from 'angular-in-memory-web-api';

import { routes }                  from './app.routes';
import { InMemoryDataService }     from './shared/in-memory-data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    // **mock‐ul doar aici**, pentru client/dev
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
        passThruUnknownUrl: true,
        delay: 300
      })
    )
  ]
};
