import { ChatMessage } from './../../classes/chat-message';
import { Injectable, inject } from '@angular/core';
import { UserClass } from '../../classes/user-class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { serverTimestamp } from '@angular/fire/firestore';
import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  runTransaction,
} from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { RankingClass } from '../../classes/ranking-class';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private firestore = inject(AngularFirestore);
  private fire = inject(Firestore);

  constructor() {}

  addUsers(user: Partial<UserClass>, colID: string) {
    const userDocRef = doc(this.fire, `users/${colID}`);
    setDoc(userDocRef, user);
  }

  getUser() {
    const usersColl = this.firestore.collection('users');
    usersColl.get;
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this.firestore
      .collection('users', (ref) => ref.where('userName', '==', username))
      .get()
      .pipe(map((snapshot) => !snapshot.empty));
  }

  getUserData(uid: string): Observable<UserClass | null> {
    const userDocRef = doc(this.fire, `users/${uid}`);
    return from(
      getDoc(userDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          return new UserClass(
            uid,
            data['userName'],
            data['email'],
            data['userType']
          );
        }
        return null;
      })
    );
  }

  addChatMsg(chatMessage: Partial<ChatMessage>) {
    const chatMessageColl = this.firestore.collection('chat');
    chatMessageColl.add({
      ...chatMessage,
      time: serverTimestamp(),
    });
  }

  getChatMsgs(): Observable<Partial<ChatMessage>[]> {
    const ChatMessageColl = this.firestore.collection('chat', (ref) =>
      ref.orderBy('time', 'asc').limit(100)
    );
    return ChatMessageColl.valueChanges() as Observable<Partial<ChatMessage>[]>;
  }

  async addToRankingIfHigherScore(
    rankingData: Partial<RankingClass>,
    game: string,
    uid: string
  ) {
    const rankingDocRef = doc(this.fire, `ranking-${game}/${uid}`);

    try {
      await runTransaction(this.fire, async (transaction) => {
        const rankingDoc = await transaction.get(rankingDocRef);

        if (rankingDoc.exists()) {
          const currentScore = rankingDoc.data()['score'];
          if (rankingData.score && rankingData.score > currentScore) {
            transaction.set(
              rankingDocRef,
              {
                ...rankingData,
                time: serverTimestamp(),
              },
              { merge: true }
            );
          }
        } else {
          transaction.set(rankingDocRef, {
            ...rankingData,
            time: serverTimestamp(),
          });
        }
      });
    } catch (error) {
      console.error('Error en la transacción:', error);
    }
  }

  getHigherScores(game: string): Observable<RankingClass[]> {
    const rankingColl = this.firestore.collection<RankingClass>(
      `ranking-${game}`,
      (ref) => ref.orderBy('score', 'desc').limit(10)
    );
    return rankingColl.valueChanges();
  }
}
