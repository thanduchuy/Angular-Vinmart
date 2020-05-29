import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { BehaviorSubject } from "rxjs";
import { User } from "src/app/shared/models/user.model";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  db = firebase.firestore();
  check: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _check = this.check.asObservable();
  user: BehaviorSubject<any> = new BehaviorSubject<any>({});
  $user = this.user.asObservable();
  onSingIn(user: any) {
    return firebase.auth().signInWithEmailAndPassword(user.name, user.pass);
  }
  onSignOut() {
    return firebase.auth().signOut();
  }
  setCheck(is: boolean) {
    this.check.next(is);
  }
  setUser(email: string, name: string, phone: string) {
    this.user.next({ email: email, name: name, phone: phone });
  }
  getInfoUser(email: string) {
    return this.db
      .collection("auth")
      .doc(email)
      .get();
  }
  onRegister(user) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
  }
  checkLogin() {
    return firebase.auth();
  }
  setInFoUser(user) {
    return this.db
      .collection("auth")
      .doc(user.email)
      .set({
        name: user.name,
        phone: user.phone,
        birthDay: user.birthDay,
        gender: user.gender
      });
  }
  getInfoAuth(email: string) {
    return this.db
      .collection("auth")
      .doc(email)
      .get();
  }
  changePasswordAuth(newPass: string) {
    return firebase.auth().currentUser.updatePassword(newPass);
  }
  constructor() {}
}
