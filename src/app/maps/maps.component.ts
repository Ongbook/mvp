import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalEntityProfileComponent } from './modal-entity-profile/modal-entity-profile.component';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  /**
   * Google Maps Zoom Level
  */
  zoom: number = 4;
  lat: number = -13.4959635;
  lng: number = -53.33138455;
  entidades: Observable<{}>;
  markers: marker[] = [];
  iconUrl: string = "https://firebasestorage.googleapis.com/v0/b/mvp-ongbook.appspot.com/o/ongbook-marker.png?alt=media&token=54548289-eb45-41b9-aebf-0db0660c1570";
  dataResponse = [];

  public modalRef: BsModalRef;

  @Input() fantasia;
  @Input() areaAtuacao;
  @Input() cnpj;
  @Input() razaoSocial;
  @Input() endereco;
  @Input() cep;
  @Input() telefone;
  @Input() email;
  @Input() presidente;
  @Input() dtFundacao;

  constructor(public db: AngularFireDatabase, private modalService: BsModalService) {

    this.entidades = db.list('entidades').valueChanges();

    this.entidades.subscribe(data => {

      this.dataResponse = [];
      // passando o objeto para array
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.dataResponse.push(data[key]);
        }
      }

      localStorage.setItem('listagem_completa', JSON.stringify(data));

      this.markers = [];

      for (let i = 0; i < this.dataResponse.length; i++) {
        this.markers.push({
          lat: data[i].lat,
          lng: data[i].lng,
          dados: data[i].receita,
          draggable: false
        });
      }
    });
  }

  ngOnInit() { }

  public openModalEntityProfile(indexEntity) {
    //console.log(indexEntity);
    this.modalRef = this.modalService.show(ModalEntityProfileComponent);

    this.modalRef.content.fantasia = this.dataResponse[indexEntity].receita.fantasia;
    this.modalRef.content.areaAtuacao = this.dataResponse[indexEntity].receita.atividade_principal[0].text;
    this.modalRef.content.cnpj = this.dataResponse[indexEntity].receita.cnpj;
    this.modalRef.content.razaoSocial = this.dataResponse[indexEntity].receita.nome;
    if (!this.dataResponse[indexEntity].receita.complemento) {
      this.modalRef.content.endereco = this.dataResponse[indexEntity].receita.logradouro + ', ' + this.dataResponse[indexEntity].receita.numero + ' - ' + this.dataResponse[indexEntity].receita.bairro + '. ' + this.dataResponse[indexEntity].receita.municipio + ' - ' + this.dataResponse[indexEntity].receita.uf + ', ';
    } else {
      this.modalRef.content.endereco = this.dataResponse[indexEntity].receita.logradouro + ', ' + this.dataResponse[indexEntity].receita.numero + ' - ' + this.dataResponse[indexEntity].receita.complemento + ' - ' + this.dataResponse[indexEntity].receita.bairro + '. ' + this.dataResponse[indexEntity].receita.municipio + ' - ' + this.dataResponse[indexEntity].receita.uf + ', ';
    }
    this.modalRef.content.cep = this.dataResponse[indexEntity].receita.cep;
    this.modalRef.content.telefone = this.dataResponse[indexEntity].receita.telefone;
    this.modalRef.content.email = this.dataResponse[indexEntity].receita.email;
    if (this.dataResponse[indexEntity].receita.qsa) {
      this.modalRef.content.presidente = this.dataResponse[indexEntity].receita.qsa[0].nome;
    }
    this.modalRef.content.dtFundacao = this.dataResponse[indexEntity].receita.abertura;
    //console.log(this.dataResponse[indexEntity]);
  }

  clickedMarker(label: string, index: number) {
    //console.log(`clicked the marker: ${label || index}`);
  }

}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  draggable: boolean;
  dados?: {};
}
