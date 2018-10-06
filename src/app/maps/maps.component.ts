import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  // google maps zoom level
  zoom: number = 4;
  lat: number = -13.4959635;
  lng: number = -53.33138455;
  entidades: Observable<{}>;
  markers: marker[] = [];
  iconUrl: string = "https://firebasestorage.googleapis.com/v0/b/mvp-ongbook.appspot.com/o/ongbook-marker.png?alt=media&token=54548289-eb45-41b9-aebf-0db0660c1570";
  dataResponse = [];

  public modalRef: BsModalRef;

  constructor(public db: AngularFireDatabase, private modalService: BsModalService) {

    this.entidades = db.list('entidades').valueChanges();

    this.entidades.subscribe(data => {

      // passando o objeto para array
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.dataResponse.push(data[key]);
        }
      }

      for (let i = 0; i < this.dataResponse.length; i++) {
        this.markers.push({
          lat: data[i].geo.lat,
          lng: data[i].geo.lng,
          dados: data[i].receita,
          draggable: false
        });
      }
      console.log(data);
    });
  }

  ngOnInit() { }

  public openModal(templateEntityProfileDetails: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateEntityProfileDetails);
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  dados?: {};
}
