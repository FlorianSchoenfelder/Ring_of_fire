import { CommonModule } from '@angular/common';
import { Component, Injectable, NgModuleRef, inject } from '@angular/core';
import { Game } from '../models/game';
import { PlayerScreenComponent } from '../player-screen/player-screen.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInformationsComponent } from '../game-informations/game-informations.component';
import { AppComponent } from '../app.component';
import { Firestore, addDoc, collection, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { retry, subscribeOn } from 'rxjs';
import { StartScreenComponent } from '../start-screen/start-screen.component';

@Component({
  selector: 'app-game-screen',
  standalone: true,
  imports: [CommonModule, AppComponent,
    PlayerScreenComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    MatDialogModule,
    GameInformationsComponent,
    StartScreenComponent
  ],
  templateUrl: './game-screen.component.html',
  styleUrl: './game-screen.component.scss'
})

@Injectable({
  providedIn: 'root',

})



export class GameScreenComponent {
  firestore: Firestore = inject(Firestore);


  public game: Game = new Game();
  
  refId: string = '';

  constructor(private dialog: MatDialog, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      let ident = params['id'];
      this.refId = params['id'];
      this.snapShot(ident);
    });
  }

  snapShot(docId: string) {
    return onSnapshot(doc(this.firestore, "games", docId), (game: any) => {
      console.log(" Game update: ", game.data());
      let datas = game.data();
      console.log(datas.players);
      console.log(datas.currentPlayer);
      
      this.game.currentPlayer = datas.currentplayer;
      this.game.players = datas.players;
      this.game.stack = datas.stack;
      this.game.playedCards = datas.playedCards;
      this.game.currentCard = datas.currentCard;
      this.game.pickCardAnimation = datas.pickCardAnimation;
      this.game.currentSymbol = datas.currentSymbol;
      this.game.placedCard = datas.placedCard;
      this.game.placedCardSymbol = datas.placedCardSymbol;
    });
  }

  async saveGame(game:Game) {
    let docRef = doc(this.firestore, "games", this.refId);
    await updateDoc(docRef, this.toJson(game));
  }

  getGameRef() {
    return collection(this.firestore, 'games')
  }
  getSingleRef() {
    return doc(collection(this.firestore, 'games'))
  }



  toJson(game:Game) {
    return {
      players: game.players,
      stack: game.stack,
      currentCard: game.currentCard,
      pickCardAnimation: game.pickCardAnimation,
      currentSymbol: game.currentSymbol,
      placedCard: game.placedCard,
      placedCardSymbol: game.placedCardSymbol,
      playedCards: game.playedCards ||[],
      currentPlayer: game.currentPlayer || Number,
      
    }
  }


  takeCard() {
    if (this.game.players.length <= 1) {
      this.openDialog();
    }
    else {
      if (!this.game.pickCardAnimation) {
        let lastCard = this.game.stack.pop();
        
        if (!lastCard) {
          return; // Funktion beendet
        }
        this.game.pickCardAnimation = true;
        this.game.currentCard = lastCard;
        this.splitCardName();
        // console.log(this.game.currentPlayer);
        

        this.game.currentPlayer++;
        console.log(this.game.currentPlayer);
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.saveGame(this.game);
        setTimeout(() => {
          this.game.playedCards.push(lastCard);
          this.game.pickCardAnimation = false;
          this.saveGame(this.game);
          // console.log(this.game.currentPlayer);
          
        }, 1250);
      }
    }
  }

  splitCardName() {
    let parts = this.game.currentCard.split('_');
    this.game.currentSymbol = parts[0];
  }

  getCardImage(card: string) {
    let parts = card.split('_');
    this.game.placedCardSymbol = parts[0];
    return `./assets/img/cards/${this.game.placedCardSymbol}/${card}.png`
  }

  async openDialog() {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (!name) {
        return;
      }

      this.game.players.push(name);
      this.saveGame(this.game);
      
    });

  }


  getTopPosition(index: number): string {
    if (window.innerWidth < 700) {
      return `${8 + (index * 55)}px`;
    } else {
      return `${0 + (index * 80)}px`;
    }
  }
}
