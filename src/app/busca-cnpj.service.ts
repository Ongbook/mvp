import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class BuscaCnpjService {

	private url = "https://receitaws.com.br/v1/cnpj";

	constructor(private http: HttpClient) { }

	getCnpj(cnpj: any) {

		let url = `${this.url}/${cnpj}`;

		return this.http.jsonp(url, 'callback');
	}

}
