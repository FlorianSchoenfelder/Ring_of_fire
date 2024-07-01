import { CommonModule } from '@angular/common';
import { Component, Injectable, inject } from '@angular/core';
import { Firestore, onSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { GameScreenComponent } from './game-screen/game-screen.component';
// import { collection } from '@angular/fire/firestore';
import { collection, addDoc } from "firebase/firestore"; 

@Injectable({
  providedIn: 'root'
})

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

  
  title = 'ringoffire';

  

  

  constructor() {
    
  }

 
}
