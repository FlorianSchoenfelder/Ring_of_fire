import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'app-game-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-screen.component.html',
  styleUrl: './game-screen.component.scss'
})
export class GameScreenComponent {
  pickCardAnimation = false;
  currentCard: string = '';
  public game: Game = new Game();
  currentSymbol: string = '';

  constructor() {
    this.init();
  }

  init() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      const lastCard = this.game.stack.pop();
      if (!lastCard) {
        return; // Funktion beendet
      }
      this.pickCardAnimation = true;
      this.currentCard = lastCard;
      this.splitCardName();
  
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        console.log(this.game.playedCards);
        
        this.pickCardAnimation = false;
        console.log(this.pickCardAnimation);
        
      }, 1250);
    }

  }

  splitCardName() {
    let parts = this.currentCard.split('_');
    // console.log(parts);
    this.currentSymbol = parts[0];
  }
}
