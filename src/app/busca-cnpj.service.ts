import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class BuscaCnpjService {

	constructor(private http: HttpClient) { }

	getCnpj(cnpj: any) {

		let url = `${environment.receitaWsUrl}/${cnpj}`;

		return this.http.jsonp(url, 'callback');
	}

}
