import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameComponent } from '../../components/game/game.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, GameComponent, CarouselComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  carouselGames = [
    { name: 'Preguntados', image: 'preguntados-home.jpg' },
    { name: 'Ahorcado', image: 'hangmancarousel.jpg' },
    { name: 'Mayor o Menor', image: 'higherorlower.jpg' },
  ];

  games = [
    { name: 'Ahorcado', image: 'ahorcado2.jpg', url: '/ahorcado' },
    { name: 'Mayor o Menor', image: 'mayoromenor2.jpg', url: '/mayoromenor' },
    { name: 'Preguntados', image: 'preguntados.jpeg', url: '/preguntados' },
    { name: 'Unnamed', image: 'unnamed.jpg', url: '/preguntados' },
  ];
}
