import { Component, inject } from '@angular/core';
import { ApiRequestService } from '../../services/api-request/api-request.service';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  receivedData: string = "";
  letters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  apiRequest = inject(ApiRequestService);

  ngOnInit() {
    const request = this.apiRequest.getWord();

    request.subscribe((response) => {
      this.receivedData = response.toLocaleString().toUpperCase();
    })
  }

  startGame() {

  }

}
