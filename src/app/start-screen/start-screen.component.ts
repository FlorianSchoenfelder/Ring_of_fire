import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../models/game';
import { AppComponent } from '../app.component';
import { Subscriber, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  // firestore: Firestore = inject(Firestore);

  public game: Game = new Game();
  docReference:string = '';
  
  constructor(private firestore: Firestore, private router: Router) {

  }

  init() {
    this.game = new Game();
    // this.firestore.subscribe()
    // this.getGameRef().subscribe();
    // .subscribe((game:any) => {
    //   this.game.currentPlayer = game.currentPlayer;
    //   this.game.stack = game.stack;
    //   this.game.playedCards = game.playedCards;
    //   this.game.players = game.players;
    // });
  }


  ngOnDestroy(): void {
    this.getGameSnapshot();
    this.addItem();
  }

  ngOnInit(): void {
    this.init();
    this.addItem();
    
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

  showGameScreen() {
    this.router.navigateByUrl('/game/' + this.docReference);
  }

}
