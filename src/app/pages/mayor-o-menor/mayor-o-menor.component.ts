import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import Swal from 'sweetalert2'
import Atropos from 'atropos';
import 'atropos/css'

@Component({
  selector: 'app-mayor-o-menor',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.css'
})
export class MayorOMenorComponent {
  start: boolean = false;
  currentCard: any;
  nextCard: any;
  lives: number = 3;
  hearts: string[] = [];
  gameOver: boolean = false;
  successes: number = 0;

  cards = [
    { id: 'hearts-A', image: 'Hearts-A.png', valor: 1 },
    { id: 'hearts-2', image: 'Hearts-2.png', valor: 2 },
    { id: 'hearts-3', image: 'Hearts-3.png', valor: 3 },
    { id: 'hearts-4', image: 'Hearts-4.png', valor: 4 },
    { id: 'hearts-5', image: 'Hearts-5.png', valor: 5 },
    { id: 'hearts-6', image: 'Hearts-6.png', valor: 6 },
    { id: 'hearts-7', image: 'Hearts-7.png', valor: 7 },
    { id: 'hearts-8', image: 'Hearts-8.png', valor: 8 },
    { id: 'hearts-9', image: 'Hearts-9.png', valor: 9 },
    { id: 'hearts-10', image: 'Hearts-10.png', valor: 10 },
    { id: 'hearts-J', image: 'Hearts-J.png', valor: 11 },
    { id: 'hearts-Q', image: 'Hearts-Q.png', valor: 12 },
    { id: 'hearts-K', image: 'Hearts-K.png', valor: 13 },

    { id: 'pikes-A', image: 'Pikes-A.png', valor: 1 },
    { id: 'pikes-2', image: 'Pikes-2.png', valor: 2 },
    { id: 'pikes-3', image: 'Pikes-3.png', valor: 3 },
    { id: 'pikes-4', image: 'Pikes-4.png', valor: 4 },
    { id: 'pikes-5', image: 'Pikes-5.png', valor: 5 },
    { id: 'pikes-6', image: 'Pikes-6.png', valor: 6 },
    { id: 'pikes-7', image: 'Pikes-7.png', valor: 7 },
    { id: 'pikes-8', image: 'Pikes-8.png', valor: 8 },
    { id: 'pikes-9', image: 'Pikes-9.png', valor: 9 },
    { id: 'pikes-10', image: 'Pikes-10.png', valor: 10 },
    { id: 'pikes-J', image: 'Pikes-J.png', valor: 11 },
    { id: 'pikes-Q', image: 'Pikes-Q.png', valor: 12 },
    { id: 'pikes-K', image: 'Pikes-K.png', valor: 13 },

    { id: 'clovers-A', image: 'Clovers-A.png', valor: 1 },
    { id: 'clovers-2', image: 'Clovers-2.png', valor: 2 },
    { id: 'clovers-3', image: 'Clovers-3.png', valor: 3 },
    { id: 'clovers-4', image: 'Clovers-4.png', valor: 4 },
    { id: 'clovers-5', image: 'Clovers-5.png', valor: 5 },
    { id: 'clovers-6', image: 'Clovers-6.png', valor: 6 },
    { id: 'clovers-7', image: 'Clovers-7.png', valor: 7 },
    { id: 'clovers-8', image: 'Clovers-8.png', valor: 8 },
    { id: 'clovers-9', image: 'Clovers-9.png', valor: 9 },
    { id: 'clovers-10', image: 'Clovers-10.png', valor: 10 },
    { id: 'clovers-J', image: 'Clovers-J.png', valor: 11 },
    { id: 'clovers-Q', image: 'Clovers-Q.png', valor: 12 },
    { id: 'clovers-K', image: 'Clovers-K.png', valor: 13 },

    { id: 'tiles-A', image: 'Tiles-A.png', valor: 1 },
    { id: 'tiles-2', image: 'Tiles-2.png', valor: 2 },
    { id: 'tiles-3', image: 'Tiles-3.png', valor: 3 },
    { id: 'tiles-4', image: 'Tiles-4.png', valor: 4 },
    { id: 'tiles-5', image: 'Tiles-5.png', valor: 5 },
    { id: 'tiles-6', image: 'Tiles-6.png', valor: 6 },
    { id: 'tiles-7', image: 'Tiles-7.png', valor: 7 },
    { id: 'tiles-8', image: 'Tiles-8.png', valor: 8 },
    { id: 'tiles-9', image: 'Tiles-9.png', valor: 9 },
    { id: 'tiles-10', image: 'Tiles-10.png', valor: 10 },
    { id: 'tiles-J', image: 'Tiles-J.png', valor: 11 },
    { id: 'tiles-Q', image: 'Tiles-Q.png', valor: 12 },
    { id: 'tiles-K', image: 'Tiles-K.png', valor: 13 }
  ];

  private atroposInitialized = false;

  startGame() {
    this.lives = 3;
    this.updateHearts();
    this.gameOver = false;
    this.currentCard = this.getRandomCard();
    this.nextCard = this.getRandomCard();
    this.start = true;
    this.atroposInitialized = false; // Resetear para inicializar Atropos de nuevo
  }

  ngAfterViewChecked(): void {
    if (this.start && !this.atroposInitialized) {
      const atroposElement = document.querySelector('.my-atropos');
      if (atroposElement) {
        this.initializeAtropos();
        this.atroposInitialized = true; // Marcar que ya está inicializado
      }
    }
  }

  initializeAtropos() {
    Atropos({
      el: '.my-atropos',
      activeOffset: 20,
      shadowScale: 1.05,
      shadow: true
    });
  }

  checkGuess(userGuess: string) {
    const comparison = this.nextCard.valor > this.currentCard.valor ? 'mayor' : 'menor';

    if (userGuess === comparison) {
      this.currentCard = this.nextCard;
      this.nextCard = this.getRandomCard();
      this.successes += 1;
    } else {
      this.loseLife();
      if (this.lives === 0) {
        this.endGame();
      }
    }
  }

  getRandomCard() {
    const randomIndex = Math.floor(Math.random() * this.cards.length);
    return this.cards[randomIndex];
  }

  endGame() {
    Swal.fire({
      title: "Perdiste",
      html: "Juego terminado!<br>Conseguiste: <strong>" + this.successes + "</strong> puntos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, seguir jugando!",
      cancelButtonText: "No, salir",
    }).then((result) => {
      if (result.isDismissed) {
        this.start = false;
      }
    });
    this.gameOver = true;
    this.start = false;
    this.successes = 0;
    this.startGame();
  }

  resetGame() {
    this.startGame();
  }

  updateHearts() {
    this.hearts = [];
    for (let i = 0; i < this.lives; i++) {
      this.hearts.push('❤️');
    }
  }

  loseLife() {
    if (this.lives > 0) {
      this.lives--;
      this.updateHearts();
    }
  }
}
