import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRequestService } from '../../services/api-request/api-request.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnDestroy {
  start: boolean = false;
  receivedData: any = {};
  currentQuestionIndex: number = 0;
  currentQuestion: any;
  answers: string[] = [];
  lives: number = 3;
  hearts: string[] = [];
  correctAnswers: number = 0;
  gameOver: boolean = false;
  roundOver: boolean = false;
  selectedAnswer: string | null = null;
  showNextButton: boolean = false;
  correctAnswer: string | null = null;
  selectedCategory: { title: string, category: string, image: string } | null = null;
  remainingTime: number = 30; // Tiempo en segundos (1 minuto y medio)
  intervalId: any = null;
  circleAnimation: string = '';


  categories = [
    { title: 'Geografía', category: 'geography', image: "tito.png" },
    { title: 'Arte y Literatura', category: 'arts&literature', image: "tina.png" },
    { title: 'Entretenimiento', category: 'entertainment', image: "pop.png" },
    { title: 'Ciencia y Naturaleza', category: 'science&nature', image: "albert.webp" },
    { title: 'Deportes y Ocio', category: 'sports&leisure', image: "bonzo.webp" },
    { title: 'Historia', category: 'history', image: "hector.webp" }
  ];

  private apiRequest = inject(ApiRequestService);

  constructor() {
    this.receivedData = { questions: [] };
    this.updateHearts();
    this.updateCircleAnimation();
  }

  startGame() {
    this.start = true;
    this.currentQuestionIndex = 0;
    this.updateHearts();
    this.setCurrentQuestion();
  }

  selectCategory(selectedCategory: { title: string, category: string, image: string }) {
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
    this.apiRequest.getQuiz(5, randomPage, selectedCategory.category).subscribe((response) => {
      this.receivedData = response;
      this.currentQuestionIndex = 0;
      this.setCurrentQuestion();
      this.selectedCategory = selectedCategory;
      this.startTimer();
    }, (error) => {
      console.error("Error al obtener datos del quiz:", error);
    });
  }

  setCurrentQuestion() {
    if (this.receivedData.questions.length === 0) {
      return;
    }
    if (this.currentQuestionIndex < this.receivedData.questions.length) {
      this.currentQuestion = this.receivedData.questions[this.currentQuestionIndex];
      this.answers = this.getShuffledAnswers(this.currentQuestion);
    } else {
      this.roundOver = true;
    }
  }

  getShuffledAnswers(question: any): string[] {
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
    this.correctAnswer = this.currentQuestion.correctAnswers;
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
        position: "center",
        icon: "error",
        html: "Perdiste! Te quedaste sin vidas.",
        showConfirmButton: true,
        timer: 2000
      });
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
        this.checkAnswer("no-responsed");
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
}
