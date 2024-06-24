import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

@Component({
  selector: 'app-game-screen',
  standalone: true,
  imports: [CommonModule, PlayerScreenComponent,
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
    GameInformationsComponent
  ],
  templateUrl: './game-screen.component.html',
  styleUrl: './game-screen.component.scss'
})
export class GameScreenComponent {
  pickCardAnimation = false;
  currentCard: string = '';
  public game: Game = new Game();
  currentSymbol: string = '';
  placedCard: string = '';
  placedCardSymbol: string = '';
  

  constructor(private dialog: MatDialog) {
    this.init();
  }

  init() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (this.game.players.length == 0) {
      this.openDialog();
    }
    else{
      if (!this.pickCardAnimation) {
      let lastCard = this.game.stack.pop();
      if (!lastCard) {
        return; // Funktion beendet
      }
      this.pickCardAnimation = true;
      this.currentCard = lastCard;
      this.splitCardName();

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1250);
    }
    }
    

  }

  splitCardName() {
    let parts = this.currentCard.split('_');
    this.currentSymbol = parts[0];
  }

  getCardImage(card: string) {
    let parts = card.split('_');
    this.placedCardSymbol = parts[0];
    return `./assets/img/cards/${this.placedCardSymbol}/${card}.png`
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (!name) {
        return;
      }
      this.game.players.push(name);
    });
  }
}
