import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameComponent } from './game/game.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, GameComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  juegos = [
    { nombre: 'Ahorcado', imagen: 'ahorcado2.jpg' },
    { nombre: 'Mayor o Menor', imagen: 'mayoromenor2.jpg' },
    { nombre: 'Preguntados', imagen: 'preguntados.jpeg' },
    { nombre: 'Unnamed', imagen: 'unnamed.jpg' },
  ];
}
