import { Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameScreenComponent } from './game-screen/game-screen.component';

export const routes: Routes = [
    {path: '', component: StartScreenComponent},
    {path: 'game/:id', component: GameScreenComponent}
];
