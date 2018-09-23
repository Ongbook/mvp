import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class BuscaCnpjService {

	url = 'https://www.receitaws.com.br/v1/cnpj';

	constructor(private http: HttpClient) { }

	getCnpj(cnpj: any) {
		let uri = `${this.url}/${cnpj}`;
		console.log(uri);

		return this
		.http
		.get(uri);
	}

}
