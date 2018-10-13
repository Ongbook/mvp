import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-modal-entity-profile',
  templateUrl: './modal-entity-profile.component.html',
  styleUrls: ['./modal-entity-profile.component.scss']
})
export class ModalEntityProfileComponent implements OnInit {

  public modalClose: BsModalRef;

  constructor(private modalService: BsModalService) { }

  public closeModalEntityProfile() {
    // fechar modal
  }

  ngOnInit() {
  }

}
