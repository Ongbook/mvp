import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, URLSearchParams } from '@angular/http';

@Injectable({
	providedIn: 'root'
})
export class EnviaEmailService {

	constructor(private http: HttpClient) { }

	enviarEmail() {

		console.log('entrou no service.......');

		let url = 'https://us-central1-mvp-ongbook.cloudfunctions.net/httpEmail';
		let params: URLSearchParams = new URLSearchParams();
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
				'Access-Control-Allow-Headers':
				'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
			})
		}

		params.set('to', 'no-reply@ongbook.org');
		params.set('from', 'jordanpena@ongbook.org');
		params.set('subject', 'test-email-function');
		params.set('content', 'Hello Functions #Rubens!');

		console.log('params ');
		console.log(params);

		
		return this.http.post(url, params, httpOptions).subscribe(
			data =>
			{
				console.log(data);
			});

		/*this.http.post(url, params).toPromise()
		.then( res => {
			console.log(res)
		})
		.catch(err => {
			console.log(err)
		})*/
	}
}
