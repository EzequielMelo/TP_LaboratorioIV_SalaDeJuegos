import { Timestamp } from '@angular/fire/firestore';

export class RankingClass {
  user: null | string;
  score: number;
  time: Timestamp | null;

  constructor(name: null | string, score: number, time: Timestamp) {
    this.user = name;
    this.score = score;
    this.time = time;
  }
}
