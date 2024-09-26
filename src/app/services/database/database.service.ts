import { Injectable, inject } from '@angular/core';
import { User } from '../../classes/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private firestore = inject(AngularFirestore);

  constructor() { }

  addUsers(user: User) {
    const usersColl = this.firestore.collection("users");
    usersColl.add({ ...user });
  }

  getUser() {
    const usersColl = this.firestore.collection("users");
    usersColl.get
  }

  addChatMsg() {

  }

  getChatMsgs() {

  }
}
