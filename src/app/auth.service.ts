import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  public criaUsuarioEntidade(email: string, senha: string) {

    return this.afAuth.auth.createUserWithEmailAndPassword(email, senha)
      .then((res) => {

        return new Promise((resolve) => resolve(res.user.uid))

      }).catch((error) => {

        console.log(error);
        return new Promise((resolve) => resolve("erro"))
      })
  }

}
