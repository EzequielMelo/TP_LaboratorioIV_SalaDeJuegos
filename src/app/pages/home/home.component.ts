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
  styleUrl: './home.component.css',
})
export class HomeComponent {
  carouselGames = [
    {
      name: 'Preguntados',
      image: 'preguntados-home.webp',
      url: '/preguntados',
    },
    { name: 'Ahorcado', image: 'hangmancarousel.webp', url: '/ahorcado' },
    {
      name: 'Mayor o Menor',
      image: 'higherorlower.webp',
      url: '/mayor-o-menor',
    },
  ];

  games = [
    { name: 'Ahorcado', image: 'ahorcado2.webp', url: '/ahorcado' },
    {
      name: 'Mayor o Menor',
      image: 'mayoromenor2.webp',
      url: '/mayor-o-menor',
    },
    { name: 'Preguntados', image: 'preguntados.webp', url: '/preguntados' },
    {
      name: 'Arma las Palabras',
      image: 'arma-las-palabras.webp',
      url: '/arma-las-palabras',
    },
  ];
}
