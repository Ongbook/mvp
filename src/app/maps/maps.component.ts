import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-maps',
	templateUrl: './maps.component.html',
	styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
   // google maps zoom level
   zoom: number = 4;

   lat: number =  -19.82519036;
   lng: number = -40.65804826;

   entidades: Observable<{}>;

   markers: marker[] = [];

   constructor(public db: AngularFireDatabase) { 

     this.entidades = db.list('entidades').valueChanges();




     this.entidades.subscribe(data => {

       for (let i = 0; i < data.length; i++) {

         this.markers.push({
           lat: data[i].geo.lat,
           lng: data[i].geo.lng,
           dados: data[i].receita,
           draggable: false
         });

       }
     }); 

   }

   ngOnInit() {}


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
