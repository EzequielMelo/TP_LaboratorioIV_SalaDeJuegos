import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { pipe } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TP1-Laboratorio-IV';

  isChatOpen = false;
  newMessage = '';
  messages = [
    { name: 'Usuario 1', message: 'Hola!', date: new Date() },
    { name: 'Usuario 2', message: '¿Cómo estás?', date: new Date() }
  ];

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({
        name: 'Tú',
        message: this.newMessage,
        date: new Date()
      });
      this.newMessage = '';
    }
  }
}
