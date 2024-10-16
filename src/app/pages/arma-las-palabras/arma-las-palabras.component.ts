import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-arma-las-palabras',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './arma-las-palabras.component.html',
  styleUrls: ['./arma-las-palabras.component.css'],
})
export class ArmaLasPalabrasComponent implements OnDestroy {
  start: boolean = false;
  selectedLetters: string[] = [];
  possibleWords: string[] = [];
  userWord: string = '';
  correctWords: string[] = [];
  correctWordsCounter: number = 0;
  numberOfCorrectWords: number = 0;
  errorMessage: string = '';
  currentGame: any = null;
  remainingTime: number = 90;
  intervalId: any = null;
  circleAnimation: string = '';
  lives: number = 3;
  hearts: string[] = [];

  possibleGames = [
    {
      letters: ['a', 'e', 'r', 'p', 't', 'u'],
      words: [
        'puerta',
        'peru',
        'pera',
        'pure',
        'arte',
        'parte',
        'pate',
        'rap',
        'ruta',
        'taper',
        'tape',
      ],
    },
    {
      letters: ['b', 'e', 'r', 'a', 's', 't'],
      words: [
        'besar',
        'base',
        'resta',
        'arte',
        'sabe',
        'ser',
        'sera',
        'seta',
        'bar',
        'era',
        'ares',
      ],
    },
    {
      letters: ['m', 'a', 'r', 'e'],
      words: ['mar', 'era', 'rema', 'arme'],
    },
    {
      letters: ['a', 'c', 'o', 's'],
      words: ['caso', 'cosa', 'saco', 'osa'],
    },
    {
      letters: ['a', 't', 'p', 'e'],
      words: ['pate', 'tape', 'peta'],
    },
  ];

  constructor() {
    this.updateCircleAnimation();
    this.updateHearts();
  }

  startGame() {
    this.start = true;
    this.selectRandomGame();
    this.startTimer();
  }

  selectRandomGame() {
    const randomIndex = Math.floor(Math.random() * this.possibleGames.length);
    const game = this.possibleGames[randomIndex];
    this.selectedLetters = game.letters;
    this.possibleWords = game.words;
    this.numberOfCorrectWords = game.words.length;
    this.correctWords = [];
    this.userWord = '';
    this.errorMessage = '';
  }

  submitWord() {
    if (this.possibleWords.includes(this.userWord.toLowerCase())) {
      if (!this.correctWords.includes(this.userWord.toLowerCase())) {
        this.correctWords.push(this.userWord.toLowerCase());
        this.errorMessage = '';
        this.correctWordsCounter += 1;
        this.numberOfCorrectWords -= 1;
        if (this.numberOfCorrectWords === 0) {
          this.endGame();
        }
      } else {
        this.errorMessage = 'Ya ingresaste esta palabra.';
      }
    } else {
      this.errorMessage = 'Palabra incorrecta. Intenta de nuevo.';
    }
    this.userWord = '';
  }

  startTimer() {
    this.remainingTime = 90;
    this.updateCircleAnimation();
    this.intervalId = setInterval(() => {
      this.remainingTime--;
      this.updateCircleAnimation();
      if (this.remainingTime === 0) {
        this.endGame();
      }
    }, 1000);
  }

  updateCircleAnimation() {
    const circleLength = 113;
    const progress = (this.remainingTime / 90) * circleLength;
    this.circleAnimation = `stroke-dashoffset: ${circleLength - progress}px;`;
  }

  endGame() {
    let message: string =
      'Ronda terminada!<br>Conseguiste armar las: <strong>' +
      this.correctWords.length +
      '</strong> palabras correctas';
    clearInterval(this.intervalId);
    if (this.numberOfCorrectWords !== 0) {
      this.loseLife();
      message =
        'Ronda terminada!<br>Conseguiste armar: <strong>' +
        this.correctWords.length +
        '</strong> palabra/s de: <strong>' +
        this.possibleWords.length +
        '</strong><br>perderas una vida';
    }

    if (this.lives > 0) {
      Swal.fire({
        title: 'Ronda Finalizada',
        html: message,
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Seguir jugando!',
        cancelButtonText: 'No, salir',
      }).then((result) => {
        if (result.isDismissed) {
          this.start = false;
          this.correctWordsCounter = 0;
          this.numberOfCorrectWords = 0;
          this.lives = 3;
        }
        if (result.isConfirmed) {
          this.startGame();
        }
      });
    } else {
      Swal.fire({
        title: 'Juego Finalizado',
        html:
          'Juego terminado!<br>Conseguiste armar: <strong>' +
          this.correctWordsCounter +
          '</strong> palabras',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Seguir jugando!',
        cancelButtonText: 'No, salir',
      }).then((result) => {
        if (result.isDismissed) {
          this.start = false;
          this.correctWordsCounter = 0;
          this.numberOfCorrectWords = 0;
          this.lives = 3;
        }
        if (result.isConfirmed) {
          this.startGame();
          this.correctWordsCounter = 0;
          this.numberOfCorrectWords = 0;
          this.lives = 3;
        }
      });
    }
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

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
