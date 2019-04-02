import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-modal-entity-profile',
  templateUrl: './modal-entity-profile.component.html',
  styleUrls: ['./modal-entity-profile.component.scss']
})
export class ModalEntityProfileComponent implements OnInit {

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
  @Input() anoFundacao;

  public modalClose: BsModalRef;
  /**
   * No momento está sendo inutilizado.
  */
  // hideModal: BsModalRef;

  constructor(private modalService: BsModalService) { }

  public closeModalEntityProfile() {
    // fechar modal
  }

  hideModal() {
    this.modalService._hideModal(1);
  }
  ngOnInit() {
  }
}
