import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgForm } from '@angular/forms';

import { AngularFireDatabase } from '@angular/fire/database';

import { BuscaCnpjService } from '../busca-cnpj.service';
import { BuscaLatLngService } from '../busca-lat-lng.service';
import { EnviaEmailService } from '../envia-email.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

	navbarOpen = false;

	cnpj: any;
	atividadePrincipal: string;
	razaoSocial: string;
	fantasia: string;
	email: string;
	result: boolean = false;
	showMap: boolean = false;
	salvo: boolean = false;
	lat: number = -19.82519036;
	lng: number = -40.65804826;

	public modalRef: BsModalRef;

	constructor(private modalService: BsModalService, private BuscaCnpjService: BuscaCnpjService,
		private BuscaLatLngService: BuscaLatLngService, private db: AngularFireDatabase, private EnviaEmailService: EnviaEmailService) { }

	ngOnInit() {
	}

	public openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

	enviaEmail() {
		this.EnviaEmailService.sendEmail();
	}

	findCnpj(value) {

		this.BuscaCnpjService.getCnpj(value).subscribe((res) => {

			console.log(res);

			localStorage.setItem("dadosReceita", JSON.stringify(res));

			//concat
			let endereco = res['logradouro'] + ', ' + res['numero'] + ' - ' + res['bairro'] + ', ' + res['municipio'] + '-' + res['uf'];

			console.log(endereco);

			this.result = true;

			this.atividadePrincipal = res['atividade_principal'][0].text;
			this.razaoSocial = res['nome'];
			this.fantasia = res['fantasia'];
			this.email = res['email'];
			this.cnpj = res['cnpj'];


			this.BuscaLatLngService.getlatlng(endereco).subscribe(data => {

				let result = data['results'];

				this.lat = result[0].geometry.location.lat;
				this.lng = result[0].geometry.location.lng;

				localStorage.setItem("geocode", JSON.stringify(result[0].geometry.location));

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

	onSubmit(form: NgForm) {

		let geo = JSON.parse(localStorage.getItem("geocode"));

		let receita = JSON.parse(localStorage.getItem("dadosReceita"));

		let f = form.value;

		let entidade = {
			geo: geo,
			receita: receita,
			form: f
		};


		this.db.list('/entidades').push({
			geo: geo,
			receita: receita,
			form: f
		});

		console.log('## onsubmit ##');

		this.modalRef.hide();

		this.salvo = true;

	}


}
