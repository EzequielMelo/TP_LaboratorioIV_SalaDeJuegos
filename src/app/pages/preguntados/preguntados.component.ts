import { Component, inject } from '@angular/core';
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
export class PreguntadosComponent {
  start: boolean = false;
  receivedData: any = {};
  currentQuestionIndex: number = 0;
  currentQuestion: any;
  answers: string[] = [];
  lives: number = 3;
  correctAnswers: number = 0;
  gameOver: boolean = false;
  roundOver: boolean = false;

  categories = [
    { title: 'Geografía', category: 'geography' },
    { title: 'Arte y Literatura', category: 'arts&literature' },
    { title: 'Entretenimiento', category: 'entertainment' },
    { title: 'Ciencia y Naturaleza', category: 'science&nature' },
    { title: 'Deportes y Ocio', category: 'sports&leisure' },
    { title: 'Historia', category: 'history' }
  ];

  private apiRequest = inject(ApiRequestService);

  constructor() {
    this.receivedData = { questions: [] };
  }

  startGame() {
    this.start = true;
    this.currentQuestionIndex = 0;
    this.setCurrentQuestion();
  }

  selectCategory(category: string) {
    if (this.gameOver) {
      this.lives = 3;
      this.correctAnswers = 0;
      this.gameOver = false;
    }
    if (this.roundOver) {
      this.roundOver = false;
    }
    const randomPage = Math.floor(Math.random() * 5) + 1;
    this.apiRequest.getQuiz(5, randomPage, category).subscribe((response) => {
      this.receivedData = response;
      this.currentQuestionIndex = 0;
      this.setCurrentQuestion();
      console.log(this.receivedData);
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
    if (selectedAnswer === this.currentQuestion.correctAnswers) {
      this.correctAnswers++;
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        html: "Respuesta incorrecta.<br>La respuesta correcta era: <strong>" + this.currentQuestion.correctAnswers + "</strong>",
        showConfirmButton: true,
        timer: 2000
      });
      this.lives--;
    }

    this.currentQuestionIndex++;
    if (this.lives === 0) {
      this.gameOver = true;
      this.roundOver = true;
      Swal.fire({
        position: "center",
        icon: "error",
        html: "</strong>Perdiste!!<strong> Te quedaste sin vidas.",
        showConfirmButton: true,
        timer: 2000
      });
    } else {
      this.setCurrentQuestion();
    }
  }
}
