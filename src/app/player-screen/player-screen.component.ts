import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-screen.component.html',
  styleUrl: './player-screen.component.scss'
})
export class PlayerScreenComponent {

  @Input() name: string = '';
  @Input() playerActive: boolean = false;
}
