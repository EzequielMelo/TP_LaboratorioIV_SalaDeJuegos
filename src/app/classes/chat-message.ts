import { FieldValue, Timestamp } from '@angular/fire/firestore';

export class ChatMessage {
  user: null | string;
  message: string;
  time: Timestamp | FieldValue;

  constructor(name: null | string, message: string, time: Timestamp) {
    this.user = name;
    this.message = message;
    this.time = time;
  }
}
