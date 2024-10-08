import { Component, inject } from '@angular/core';
import { ApiRequestService } from '../../services/api-request/api-request.service';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  start: boolean = false;

  private apiRequest = inject(ApiRequestService);

  ngOnInit() {
    const request = this.apiRequest.getQuiz(5, 1, "geography");
    request.subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.error("Error al obtener datos del quiz:", error);
    });
  }

  startGame() {
    this.start = true;
  }

}
