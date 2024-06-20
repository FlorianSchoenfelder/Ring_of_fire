import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-game-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-screen.component.html',
  styleUrl: './game-screen.component.scss'
})
export class GameScreenComponent {
pickCardAnimation = false;

  takeCard() {
    this.pickCardAnimation = true;
  }
}
