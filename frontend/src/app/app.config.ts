import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { tasksReducer } from './state/tasks/tasks.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
        tasks: tasksReducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
