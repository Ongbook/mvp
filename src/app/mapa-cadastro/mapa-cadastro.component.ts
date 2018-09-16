import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-mapa-cadastro',
	templateUrl: './mapa-cadastro.component.html',
	styleUrls: ['./mapa-cadastro.component.css']
})
export class MapaCadastroComponent implements OnInit {
	// google maps zoom level
	zoom: number = 16;

	@Input() lat: number;
	@Input() lng: number;

	markers: marker[] = [];

	constructor() { }

	ngOnInit() {
		
		let lt = this.lat;
		let lg = this.lng;

		this.markers.push({
			lat: lt,
			lng: lg,
			label: '',
			draggable: true
		});

	}

	markerDragEnd(m: marker, $event: MouseEvent) {
		console.log('dragEnd', m, $event);
	}

}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}