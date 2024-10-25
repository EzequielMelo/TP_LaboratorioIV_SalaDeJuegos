import { ChatMessage } from './../../classes/chat-message';
import { Injectable, inject } from '@angular/core';
import { UserClass } from '../../classes/user-class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { serverTimestamp } from '@angular/fire/firestore';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';

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
}
