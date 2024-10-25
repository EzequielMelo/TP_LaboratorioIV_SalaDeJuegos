import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRequestService } from '../../services/api-request/api-request.service';
import { Question } from './../../models/question.interface';
import { QuizResponse } from '../../models/quiz-response.interface';
import { Category } from '../../models/category.interface';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth.service';
import { DatabaseService } from '../../services/database/database.service';
import { UserClass } from '../../classes/user-class';
import { Subscription } from 'rxjs';
import { RankingClass } from '../../classes/ranking-class';
import { RankingComponent } from '../../components/ranking/ranking.component';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule, RankingComponent],
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css'],
})
export class PreguntadosComponent implements OnDestroy {
  start: boolean = false;
  receivedData: QuizResponse = { questions: [] };
  currentQuestionIndex: number = 0;
  currentQuestion: Question | null = null;
  answers: string[] = [];
  lives: number = 3;
  hearts: string[] = [];
  correctAnswers: number = 0;
  gameOver: boolean = false;
  roundOver: boolean = false;
  selectedAnswer: string | null = null;
  showNextButton: boolean = false;
  correctAnswer: string | null = null;
  selectedCategory: Category | null = null;
  remainingTime: number = 30;
  intervalId: ReturnType<typeof setInterval> | null = null;
  circleAnimation: string = '';
  userName: string | null = null;
  userId: string | null = null;
  subscription: Subscription | null = null;
  ranking: RankingClass[] | null = null;

  categories: Category[] = [
    { title: 'Geografía', category: 'geography', image: 'tito.webp' },
    {
      title: 'Arte y Literatura',
      category: 'arts&literature',
      image: 'tina.webp',
    },
    { title: 'Entretenimiento', category: 'entertainment', image: 'pop.webp' },
    {
      title: 'Ciencia y Naturaleza',
      category: 'science&nature',
      image: 'albert.webp',
    },
    {
      title: 'Deportes y Ocio',
      category: 'sports&leisure',
      image: 'bonzo.webp',
    },
    { title: 'Historia', category: 'history', image: 'hector.webp' },
  ];

  protected authService = inject(AuthService);
  private apiRequest = inject(ApiRequestService);
  private db = inject(DatabaseService);

  constructor() {
    this.receivedData = { questions: [] };
    this.updateHearts();
    this.updateCircleAnimation();
    this.authService.user$.subscribe((userClass: UserClass | null) => {
      this.userName = userClass ? userClass.userName : null;
      this.userId = userClass ? userClass.id : null;
    });
    const observable = this.db.getHigherScores('preguntados');
    this.subscription = observable.subscribe((resultado) => {
      this.ranking = resultado as RankingClass[];
    });
  }

  startGame() {
    this.start = true;
    this.currentQuestionIndex = 0;
    this.updateHearts();
    this.setCurrentQuestion();
  }

  selectCategory(selectedCategory: Category) {
    if (this.gameOver) {
      this.lives = 3;
      this.correctAnswers = 0;
      this.gameOver = false;
      this.updateHearts();
    }
    if (this.roundOver) {
      this.roundOver = false;
    }
    const randomPage = Math.floor(Math.random() * 5) + 1;
    this.apiRequest.getQuiz(5, randomPage, selectedCategory.category).subscribe(
      (response: QuizResponse) => {
        this.receivedData = response;
        this.currentQuestionIndex = 0;
        this.setCurrentQuestion();
        this.selectedCategory = selectedCategory;
        this.startTimer();
      },
      (error) => {
        console.error('Error al obtener datos del quiz:', error);
      }
    );
  }

  setCurrentQuestion() {
    if (this.receivedData.questions.length === 0) {
      return;
    }
    if (this.currentQuestionIndex < this.receivedData.questions.length) {
      this.currentQuestion =
        this.receivedData.questions[this.currentQuestionIndex];
      this.answers = this.getShuffledAnswers(this.currentQuestion);
    } else {
      this.roundOver = true;
    }
  }

  getShuffledAnswers(question: Question): string[] {
    const answers = [question.correctAnswers, ...question.incorrectAnswers];
    return this.shuffleArray(answers);
  }

  shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  checkAnswer(selectedAnswer: string) {
    this.selectedAnswer = selectedAnswer;
    this.correctAnswer = this.currentQuestion
      ? this.currentQuestion.correctAnswers
      : null;
    this.stopTimer();

    if (selectedAnswer === this.correctAnswer) {
      this.correctAnswers++;
    } else {
      this.loseLife();
    }

    this.showNextButton = true;
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.selectedAnswer = null;
    this.showNextButton = false;
    this.correctAnswer = null;

    if (this.lives === 0) {
      this.gameOver = true;
      this.roundOver = true;
      Swal.fire({
        position: 'center',
        icon: 'error',
        html: 'Perdiste! Te quedaste sin vidas.',
        showConfirmButton: true,
        timer: 2000,
      });
      this.addToRanking();
    } else {
      this.setCurrentQuestion();
      this.startTimer();
    }
  }

  loseLife() {
    if (this.lives > 0) {
      this.lives--;
      this.updateHearts();
    }
  }

  updateHearts() {
    this.hearts = [];
    for (let i = 0; i < this.lives; i++) {
      this.hearts.push('❤️');
    }
  }

  // Iniciar el temporizador
  startTimer() {
    this.remainingTime = 30;
    this.updateCircleAnimation();

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.remainingTime--;
      this.updateCircleAnimation();

      if (this.remainingTime <= 0) {
        this.checkAnswer('no-responsed');
      }
    }, 1000);
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  updateCircleAnimation() {
    const circleLength = 113;
    const progress = (this.remainingTime / 30) * circleLength;
    this.circleAnimation = `stroke-dashoffset: ${circleLength - progress}px;`;
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  addToRanking() {
    if (this.userId) {
      const ranking: Partial<RankingClass> = {
        user: this.userName,
        score: this.correctAnswers,
      };
      this.db.addToRankingIfHigherScore(ranking, 'preguntados', this.userId);
    }
  }
}
