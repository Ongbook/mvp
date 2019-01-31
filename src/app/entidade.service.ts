import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class EntidadeService {

  constructor(private db: AngularFireDatabase) { }

  public criaEntidade(formulario: FormGroup) {

    return this.db.list('/entidades').push(formulario.value)
      .then((res) => {

        return new Promise((resolve) => resolve("sucesso"))

      }, error => {

        console.log(error)
        return new Promise((resolve) => resolve("erro"))
      });
  };



}
