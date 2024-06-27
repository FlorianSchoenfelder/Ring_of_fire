import { CommonModule } from '@angular/common';
import { Component, Injectable, inject } from '@angular/core';
import { Firestore, addDoc, onSnapshot } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { collection } from '@angular/fire/firestore';

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

  constructor(private GameComponent: GameScreenComponent) {

  }

  ngOnInit(): void {
    console.log(this.GameComponent.game);
    onSnapshot(this.getGameRef(), (list) => {
      list.forEach(element => {
        console.log(element.data());
      });
    });

    this.addItem({ 'Hello': 'Hello' })
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  async addItem(item: {}) {
    if (!this.GameComponent.game) {
      return
    } 
    // await this.addDoc(this.getGameRef(),item);
  }
}
