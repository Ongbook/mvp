import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})

export class BuscaCnpjService {

	private url = 'https://www.receitaws.com.br/v1/cnpj';
	private uri: string;
	private httpOptions;
	

	constructor(private http: HttpClient) { }

	getCnpj(cnpj: any) {

		this.uri = `${this.url}/${cnpj}`;
		this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
				'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
			})
		};

		console.log(this.uri);

		return this.http.get(this.uri, this.httpOptions);
	}

}
