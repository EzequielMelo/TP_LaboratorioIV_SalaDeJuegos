import { Timestamp } from '@angular/fire/firestore';

export class Chat {
  name: string;
  message: string;
  date: Timestamp;

  constructor(name: string, message: string, date: Timestamp) {
    this.name = name;
    this.message = message;
    this.date = date;
  }
}
