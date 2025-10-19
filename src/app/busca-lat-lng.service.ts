import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class BuscaLatLngService {

	constructor(private http: HttpClient) { }

	getlatlng(address: string) {

		return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + address + '&region=BR&key=AIzaSyDcgVxMPCP7yIPn2BWp5Oz1DrUN7AvS3r0');
	}

}
