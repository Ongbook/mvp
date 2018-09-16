import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-maps',
	templateUrl: './maps.component.html',
	styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
 // google maps zoom level
 zoom: number = 4;

  // initial center position for the map
  //lat: number = -12.81129062;
  //lng: number = -51.37413716;

  lat: number =  -19.82519036;
  lng: number = -40.65804826;

  markers: marker[] = [
  {
  	lat: -19.82519036,
  	lng: -40.65804826,
  	label: '',
  	draggable: false
  }
  ]

  constructor() { }

  ngOnInit() {
  	//http.get("api.ongbook.org/ongs")
  }

  clickedMarker(label: string, index: number) {
  	console.log(`clicked the marker: ${label || index}`);
  }
  
  /*mapClicked($event: MouseEvent) {

  	this.markers.push({
  		lat: $event.coords.lat,
  		lng: $event.coords.lng,
  		draggable: true
  	});
  }*/
  
  markerDragEnd(m: marker, $event: MouseEvent) {
  	console.log('dragEnd', m, $event);
  }


}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}