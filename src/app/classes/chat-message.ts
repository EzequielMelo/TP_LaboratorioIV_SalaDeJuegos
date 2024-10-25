import { Timestamp } from '@angular/fire/firestore';

export class ChatMessage {
  user: null | string;
  message: string;
  time: Timestamp | null;

  constructor(name: null | string, message: string, time: Timestamp) {
    this.user = name;
    this.message = message;
    this.time = time;
  }
}
