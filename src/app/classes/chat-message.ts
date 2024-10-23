import { FieldValue, Timestamp } from '@angular/fire/firestore';

export class ChatMessage {
  user: null | string;
  message: string;
  time: Timestamp | FieldValue | null;

  constructor(
    name: null | string,
    message: string,
    time: Timestamp | FieldValue
  ) {
    this.user = name;
    this.message = message;
    this.time = time;
  }
}
