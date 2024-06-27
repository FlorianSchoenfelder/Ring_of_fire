import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),
     provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-550d8","appId":"1:473679845887:web:00398626716a705effafca","storageBucket":"ring-of-fire-550d8.appspot.com","apiKey":"AIzaSyBwROdp_C6WT7L1_A1lZWMlIZZdo2DHbjQ","authDomain":"ring-of-fire-550d8.firebaseapp.com","messagingSenderId":"473679845887"})),
      provideFirestore(() => getFirestore())]
};
