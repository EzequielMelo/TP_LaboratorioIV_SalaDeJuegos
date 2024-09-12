import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameComponent } from './game/game.component';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, GameComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    initFlowbite();
  }

  juegos = [
    { nombre: 'Ahorcado', imagen: 'ahorcado2.jpg' },
    { nombre: 'Mayor o Menor', imagen: 'mayoromenor2.jpg' },
    { nombre: 'Preguntados', imagen: 'preguntados.jpeg' },
    { nombre: 'Unnamed', imagen: 'unnamed.jpg' },
  ];
}
