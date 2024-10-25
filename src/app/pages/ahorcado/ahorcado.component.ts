import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { ApiRequestService } from '../../services/api-request/api-request.service';
import { RankingComponent } from '../../components/ranking/ranking.component';
import Swal from 'sweetalert2';
import { DatabaseService } from '../../services/database/database.service';
import { RankingClass } from '../../classes/ranking-class';
import { UserClass } from '../../classes/user-class';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [NgClass, RankingComponent],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css',
})
export class AhorcadoComponent {
  receivedData: string = '';
  displayedWord: string[] = [];
  letters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  selectedLetters: string[] = [];
  letterStatus: { [key: string]: 'correct' | 'incorrect' | 'not-selected' } =
    {};
  errors: number = 0;
  maxErrors: number = 8;
  hangmanImage: string = 'hangman0.png';
  start: boolean = false;
  lives: number = 3;
  hearts: string[] = [];
  guessedWords: number = 0;
  userName: string | null = null;
  userId: string | null = null;
  subscription: Subscription | null = null;
  ranking: RankingClass[] | null = null;

  protected authService = inject(AuthService);
  private apiRequest = inject(ApiRequestService);
  private db = inject(DatabaseService);

  constructor() {
    this.updateHearts();
    this.authService.user$.subscribe((userClass: UserClass | null) => {
      this.userName = userClass ? userClass.userName : null;
      this.userId = userClass ? userClass.id : null;
    });
    const observable = this.db.getHigherScores('ahorcado');
    this.subscription = observable.subscribe((resultado) => {
      this.ranking = resultado as RankingClass[];
    });
  }

  startGame() {
    if (this.lives === 0) {
      this.guessedWords = 0;
      this.lives = 3;
    }
    this.updateHearts();
    const request = this.apiRequest.getWord();
    request.subscribe((response) => {
      this.receivedData = response.toLocaleString().toUpperCase();
      this.start = true;
      this.displayedWord = Array(this.receivedData.length).fill('_');
      this.errors = 0;
      this.hangmanImage = 'hangman0.webp';
      this.selectedLetters = [];
      this.letterStatus = {};
      this.letters.forEach(
        (letter) => (this.letterStatus[letter] = 'not-selected')
      );
    });
    console.log(this.ranking);
  }

  normalizeText(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  checkLetter(letter: string) {
    const normalizedLetter = this.normalizeText(letter);

    if (this.selectedLetters.includes(normalizedLetter)) return;
    this.selectedLetters.push(normalizedLetter);

    const normalizedWord = this.normalizeText(this.receivedData);

    if (normalizedWord.includes(normalizedLetter)) {
      this.letterStatus[letter] = 'correct';
      for (let i = 0; i < this.receivedData.length; i++) {
        if (normalizedWord[i] === normalizedLetter) {
          this.displayedWord[i] = this.receivedData[i];
        }
      }
    } else {
      this.errors++;
      this.hangmanImage = `hangman${this.errors}.webp`;
      this.letterStatus[letter] = 'incorrect';

      // Si el jugador pierde
      if (this.errors >= this.maxErrors) {
        this.loseLife();
        if (this.lives > 0) {
          Swal.fire({
            title: 'Perdiste',
            html:
              'La palabra era: <strong>' +
              this.receivedData +
              '</strong><br>¿Quieres seguir jugando?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, seguir jugando!',
            cancelButtonText: 'No, salir',
          }).then((result) => {
            if (result.isDismissed) {
              this.start = false;
              this.lives = 3;
              this.guessedWords = 0;
            }
          });
        } else {
          this.addToRanking();
          Swal.fire({
            title: 'Perdiste todas las vidas',
            html:
              'La palabra era: <strong>' +
              this.receivedData +
              '</strong> Lograste formar: <strong>' +
              this.guessedWords +
              '</strong> palabra/s' +
              '</strong><br>¿Quieres seguir jugando?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, seguir jugando!',
            cancelButtonText: 'No, salir',
          }).then((result) => {
            if (result.isDismissed) {
              this.start = false;
              this.lives = 3;
              this.guessedWords = 0;
            } else {
              this.lives = 3;
              this.guessedWords = 0;
            }
          });
        }
        this.startGame();
      }
    }

    // Si el jugador adivina todas las letras
    if (!this.displayedWord.includes('_')) {
      Swal.fire({
        title: 'Ganaste!!!',
        text: 'Quieres seguir jugando?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, seguir jugando!',
        cancelButtonText: 'No, salir',
      }).then((result) => {
        if (result.isDismissed) {
          this.start = false;
          this.lives = 3;
          this.guessedWords = 0;
        }
      });
      this.guessedWords++;
      this.startGame();
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

  addToRanking() {
    if (this.userId) {
      const ranking: Partial<RankingClass> = {
        user: this.userName,
        score: this.guessedWords,
      };
      this.db.addToRankingIfHigherScore(ranking, 'ahorcado', this.userId);
    }
  }
}
