import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class BuscaLatLngService {

	constructor(private http: HttpClient) { }

	getlatlng(address: string) {

		return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + address + '&region=BR&key=AIzaSyBlnVck-Tc2xx9RveTQAIyGSZNI5TSOpT4');
	}

}
