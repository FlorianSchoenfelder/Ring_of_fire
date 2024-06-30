import { CommonModule } from '@angular/common';
import { Component, Injectable, inject } from '@angular/core';
import { Firestore, onSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { GameScreenComponent } from './game-screen/game-screen.component';
// import { collection } from '@angular/fire/firestore';
import { collection, addDoc } from "firebase/firestore"; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

@Injectable({
  providedIn: 'root',
})

export class AppComponent {

  firestore: Firestore = inject(Firestore);
  title = 'ringoffire';

  firebaseConfig = {
    apiKey: "AIzaSyBwROdp_C6WT7L1_A1lZWMlIZZdo2DHbjQ",
    authDomain: "ring-of-fire-550d8.firebaseapp.com",
    projectId: "ring-of-fire-550d8",
    storageBucket: "ring-of-fire-550d8.appspot.com",
    messagingSenderId: "473679845887",
    appId: "1:473679845887:web:00398626716a705effafca"
  };

  

  constructor() {
    
  }

 
}
