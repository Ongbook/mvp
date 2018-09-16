import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { BuscaCnpjService } from '../busca-cnpj.service';
import { BuscaLatLngService } from '../busca-lat-lng.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	navbarOpen = false;

	areaAtuacaoPrincipal: string;
	razaoSocial: string;
	fantasia: string;
	email: string;
	result: boolean = false;
	showMap: boolean = false;
	lat: number = -19.82519036;
	lng: number = -40.65804826;

	public modalRef: BsModalRef;

	constructor(private modalService: BsModalService, private BuscaCnpjService: BuscaCnpjService, private BuscaLatLngService: BuscaLatLngService) { }

	ngOnInit() {
	}

	public openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

	findCnpj(value) {

		this.BuscaCnpjService.getCnpj(value).subscribe((res) => {

			console.log(res);

			//concat
			let endereco = res['logradouro'] + ', ' + res['numero'] + ' - ' + res['bairro'] + ', ' + res['municipio'] + '-' + res['uf'];

			console.log(endereco);

			this.result = true;

			this.areaAtuacaoPrincipal = res['atividade_principal'][0].text;
			this.razaoSocial = res['nome'];
			this.fantasia = res['fantasia'];
			this.email = res['email'];


			this.BuscaLatLngService.getlatlng(endereco).subscribe(data => {

				let result = data['results'];


				this.lat = result[0].geometry.location.lat;
				this.lng = result[0].geometry.location.lng;

				this.showMap = true;

			}, errr => {
				console.log(errr);
			});

		}, err => {
			console.log(err);
		});
	}

	toggleNavbar() {
		this.navbarOpen = !this.navbarOpen;
	}


}
