import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../classes/chat-message';
import { DatabaseService } from '../../services/database/database.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { UserClass } from '../../classes/user-class';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  isChatOpen = false;
  newMessage = '';
  chatMessage: ChatMessage[] = [];
  subscription: Subscription | null = null;
  userName: string | null = null;
  private isAtBottom: boolean = true;

  protected db = inject(DatabaseService);
  private authService = inject(AuthService);

  ngOnInit() {
    const observable = this.db.getChatMsgs();
    this.subscription = observable.subscribe((resultado) => {
      this.chatMessage = resultado as ChatMessage[];
      this.scrollToBottom();
    });
    this.authService.user$.subscribe((userClass: UserClass | null) => {
      this.userName = userClass ? userClass.userName : null;
    });
  }

  ngAfterViewChecked() {
    if (this.isAtBottom && this.isChatOpen) {
      this.scrollToBottom();
    }
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen) {
      // Usa setTimeout para esperar a que el DOM se renderice
      setTimeout(() => this.scrollToBottom(), 0);
    }
  }

  sendMessage() {
    if (this.newMessage.trim() === '') return;

    const chatMessage: Partial<ChatMessage> = {
      user: this.userName,
      message: this.newMessage,
    };

    this.db.addChatMsg(chatMessage);

    if (this.isAtBottom) {
      this.scrollToBottom();
    }

    this.newMessage = '';
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      try {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      } catch (err) {
        console.error('Error while scrolling:', err);
      }
    }
  }

  onScroll() {
    const container = this.messagesContainer.nativeElement;
    this.isAtBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 5; // margen para detectar si está cerca del fondo
  }

  trackByMessage(index: number, message: ChatMessage) {
    return message.time ? message.time : index;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
