import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalEntityProfileComponent } from './modal-entity-profile/modal-entity-profile.component';

import { EntidadeService } from '../entidade.service';

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
  initializedMap = false;
  startFade = false;

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
  @Input() responsavel;

  constructor(private entidadeService: EntidadeService, private modalService: BsModalService) { }

  ngOnInit() { }

  public openModalEntityProfile(indexEntity) {
    //console.log(indexEntity);
    this.modalRef = this.modalService.show(ModalEntityProfileComponent);

    this.modalRef.content.fantasia = this.dataResponse[indexEntity].nomeFantasia;
    this.modalRef.content.areaAtuacao = this.dataResponse[indexEntity].areaAtuacao;
    this.modalRef.content.cnpj = this.dataResponse[indexEntity].receita.cnpj;
    this.modalRef.content.razaoSocial = this.dataResponse[indexEntity].receita.nome;
    if (!this.dataResponse[indexEntity].receita.complemento) {
      this.modalRef.content.endereco = this.dataResponse[indexEntity].receita.logradouro + ', ' + this.dataResponse[indexEntity].receita.numero + ' - ' + this.dataResponse[indexEntity].receita.bairro + '. ' + this.dataResponse[indexEntity].receita.municipio + ' - ' + this.dataResponse[indexEntity].receita.uf + ', ';
    } else {
      this.modalRef.content.endereco = this.dataResponse[indexEntity].receita.logradouro + ', ' + this.dataResponse[indexEntity].receita.numero + ' - ' + this.dataResponse[indexEntity].receita.complemento + ' - ' + this.dataResponse[indexEntity].receita.bairro + '. ' + this.dataResponse[indexEntity].receita.municipio + ' - ' + this.dataResponse[indexEntity].receita.uf + ', ';
    }
    this.modalRef.content.cep = this.dataResponse[indexEntity].receita.cep;
    this.modalRef.content.telefone = this.dataResponse[indexEntity].receita.telefone;
    this.modalRef.content.email = this.dataResponse[indexEntity].email;
    if (this.dataResponse[indexEntity].receita.qsa) {
      this.modalRef.content.presidente = this.dataResponse[indexEntity].receita.qsa[0].nome;
    }
    this.modalRef.content.dtFundacao = this.dataResponse[indexEntity].receita.abertura;
    this.modalRef.content.responsavel = this.dataResponse[indexEntity].responsavel.nome;
  }

  initMap() {

    this.startFade = true;

    this.loadMarkers();
    
    setTimeout(() => {
      this.initializedMap = true;
    }, 2000);
    
  }

  loadMarkers() {
    this.entidadeService.recuperaTodasEntidades().subscribe((data: any[]) => {
      this.dataResponse = data; 
      this.markers = this.dataResponse
        .filter(entidade => entidade.lat && entidade.lng)
        .map(entidade => {
          return {
            lat: entidade.lat,
            lng: entidade.lng,
            dados: entidade,
            draggable: false
          };
        });
    });
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
