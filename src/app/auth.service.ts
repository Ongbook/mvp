import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup } from '@angular/forms';

import { EntidadeService } from './entidade.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private entidadeService: EntidadeService) { }

  public criaUsuarioEntidade(formCadastro: FormGroup) {

    let email = formCadastro.controls['responsavel'].value['emailResponsavel'];
    let senha = formCadastro.controls['responsavel'].value['senhaOk'];

    return this.afAuth.auth.createUserWithEmailAndPassword(email, senha)
      .then((res) => {

        formCadastro.controls['responsavel'].get('uid').setValue(res.user.uid);

        return this.entidadeService.criaEntidade(formCadastro);
        
      }).catch((error) => {

        console.log(error);
        return new Promise((resolve) => resolve("erro"))
      })
  }

}
