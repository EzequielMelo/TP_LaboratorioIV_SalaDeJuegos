import { Component, inject, } from '@angular/core';
import { NgClass } from '@angular/common';
import { ApiRequestService } from '../../services/api-request/api-request.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  receivedData: string = "";
  displayedWord: string[] = [];
  letters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];
  selectedLetters: string[] = [];
  letterStatus: { [key: string]: 'correct' | 'incorrect' | 'not-selected' } = {};
  errors: number = 0;
  maxErrors: number = 8;
  hangmanImage: string = 'hangman0.png';
  start: boolean = false;

  private apiRequest = inject(ApiRequestService);

  startGame() {
    const request = this.apiRequest.getWord();
    request.subscribe((response) => {
      this.receivedData = response.toLocaleString().toUpperCase();
      this.start = true;
      this.displayedWord = Array(this.receivedData.length).fill('_'); // Ocultar la palabra con guiones bajos
      this.errors = 0; // Reiniciar los errores
      this.hangmanImage = 'hangman0.png'; // Imagen inicial
      this.selectedLetters = []; // Reiniciar letras seleccionadas
      this.letterStatus = {}; // Reiniciar el estado de las letras
      this.letters.forEach(letter => this.letterStatus[letter] = 'not-selected');
    });
  }

  // Función para normalizar texto y eliminar tildes/acentos
  normalizeText(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

  checkLetter(letter: string) {
    const normalizedLetter = this.normalizeText(letter);

    if (this.selectedLetters.includes(normalizedLetter)) return; // Si ya fue seleccionada, no hacer nada
    this.selectedLetters.push(normalizedLetter);

    // Normalizar también la palabra recibida antes de comparar
    const normalizedWord = this.normalizeText(this.receivedData);

    if (normalizedWord.includes(normalizedLetter)) {
      // Si la letra está en la palabra, actualizar la palabra mostrada
      this.letterStatus[letter] = 'correct'; // Marcar la letra como correcta
      for (let i = 0; i < this.receivedData.length; i++) {
        if (normalizedWord[i] === normalizedLetter) {
          this.displayedWord[i] = this.receivedData[i]; // Mantener acentuación original
        }
      }
    } else {
      // Incrementar errores y cambiar imagen
      this.errors++;
      this.hangmanImage = `hangman${this.errors}.png`;
      this.letterStatus[letter] = 'incorrect'; // Marcar la letra como incorrecta

      // Si el jugador pierde
      if (this.errors >= this.maxErrors) {
        Swal.fire({
          title: "Perdiste",
          html: "La palabra era: <strong>" + this.receivedData + "</strong><br>¿Quieres seguir jugando?",
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
        this.startGame();
      }
    }

    // Si el jugador adivina todas las letras
    if (!this.displayedWord.includes('_')) {
      Swal.fire({
        title: "Ganaste!!!",
        text: "Quieres seguir jugando?",
        icon: "success",
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
      this.startGame();
    }
  }
}
