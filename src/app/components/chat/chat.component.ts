import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../classes/chat-message';
import { DatabaseService } from '../../services/database/database.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { serverTimestamp } from '@angular/fire/firestore';
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
  chatMessage: any[] = [];
  subscription: Subscription | null = null;
  user: string | null = '';
  userName: string | null = null;
  private isAtBottom: boolean = true;

  protected db = inject(DatabaseService);
  private authService = inject(AuthService);

  ngOnInit() {
    const observable = this.db.getChatMsgs();
    this.subscription = observable.subscribe((resultado) => {
      this.chatMessage = resultado as ChatMessage[];
    });
    this.authService.userClass$.subscribe((userClass: UserClass | null) => {
      this.userName = userClass ? userClass.userName : null;
    });
  }

  ngAfterViewChecked() {
    if (this.isAtBottom) {
      this.scrollToBottom();
    }
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (this.newMessage.trim() === '') return;

    const chatMessage: ChatMessage = {
      user: this.userName,
      message: this.newMessage,
      time: serverTimestamp()
    };

    this.db.addChatMsg(chatMessage);
    if (this.isAtBottom) {
      this.scrollToBottom();
    }
    this.newMessage = '';
  }

  scrollToBottom() {
    this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
  }

  onScroll() {
    const container = this.messagesContainer.nativeElement;
    this.isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 5; // 10 es un margen para detectar si está cerca del fondo
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
