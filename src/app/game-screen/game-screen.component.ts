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
  placedCard: string = '';
  placedCardSymbol: string = '';

  constructor() {
    this.init();
  }

  init() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      let lastCard = this.game.stack.pop();
      if (!lastCard) {
        return; // Funktion beendet
      }
      this.pickCardAnimation = true;
      this.currentCard = lastCard;
      this.splitCardName();
      console.log('New card: ' + this.currentCard);
      console.log('Game is:', this.game);
      
      
  
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        // console.log(this.pickCardAnimation);
      }, 1250);
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
}
