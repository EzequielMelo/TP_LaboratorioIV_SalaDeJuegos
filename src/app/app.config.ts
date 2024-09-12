import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'sala-de-juegos-ezequiel-melo',
        appId: '1:592403323218:web:976b1c74cead5a3e98428b',
        storageBucket: 'sala-de-juegos-ezequiel-melo.appspot.com',
        apiKey: 'AIzaSyC6XYcd4Fg_YphYWAnanxYoMFie1k03ukM',
        authDomain: 'sala-de-juegos-ezequiel-melo.firebaseapp.com',
        messagingSenderId: '592403323218',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
};
