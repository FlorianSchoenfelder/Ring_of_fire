import { CommonModule } from '@angular/common';
import { Component, Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../models/game';
import { AppComponent } from '../app.component';
import { Subscriber, subscribeOn } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule, FormsModule, AppComponent],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);

  firebaseConfig = {
    apiKey: "AIzaSyBwROdp_C6WT7L1_A1lZWMlIZZdo2DHbjQ",
    authDomain: "ring-of-fire-550d8.firebaseapp.com",
    projectId: "ring-of-fire-550d8",
    storageBucket: "ring-of-fire-550d8.appspot.com",
    messagingSenderId: "473679845887",
    appId: "1:473679845887:web:00398626716a705effafca"
  };

  public game: Game = new Game();
  docReference:string = '';
  
  constructor(private router: Router) {

  }

  init() {
    this.game = new Game();
  }


  ngOnDestroy(): void {
    // this.getGameSnapshot();
    // this.addItem();
  }

  ngOnInit(): void {
    this.getGameRef();
  }

  getGameSnapshot() {
    return onSnapshot(this.getGameRef(), (list) => {
      list.forEach(element => {
        // console.log(element.data());
      });
    });
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  async addItem() {
    if (!this.game) {
      return
    }
    const docRef = await addDoc(this.getGameRef(), this.game.toJson());
    console.log("Document written with ID: ", docRef.id);
    let id = docRef.id;
    this.docReference = id;
   
    
  }

  async showGameScreen() {
    // 1. Neues game 
    this.init();
    await this.addItem();
    // 1.1 Echtzeitdaten abrufen (vllt in GameScreen)

    // 2. Link mit ID-Kennung weiterleiten
    this.router.navigateByUrl('/game/' + this.docReference);
  }

}
