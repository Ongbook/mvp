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
	styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

	cnpj: any;
	atividadePrincipal: String;
	razaoSocial: String;
	fantasia: String;
	email: String;
	lat: Number = -19.82519036;
	lng: Number = -40.65804826;

	navbarOpen: Boolean = false;
	registrationSteps: Number = 1;
	labelStep: Number;
	salvo: Boolean = false;

	public modalRef: BsModalRef;

	constructor(private modalService: BsModalService, private BuscaCnpjService: BuscaCnpjService,
		private BuscaLatLngService: BuscaLatLngService, private db: AngularFireDatabase, private EnviaEmailService: EnviaEmailService) { }

	ngOnInit() {
	}

	public openModalEntityRegister(templateEntityRegister: TemplateRef<any>) {
		this.modalRef = this.modalService.show(templateEntityRegister, { backdrop: 'static', keyboard: false });
	}

	findCnpj(value) {

		this.BuscaCnpjService.getCnpj(value).subscribe((res) => {
			localStorage.setItem('dadosReceita', JSON.stringify(res));

			//concat for google maps
			const endereco = res['logradouro'] + ', ' + res['numero'] + ' - ' + res['bairro'] + ', ' + res['municipio'] + '-' + res['uf'];

			this.atividadePrincipal = res['atividade_principal'][0].text;
			this.razaoSocial = res['nome'];
			this.fantasia = res['fantasia'];
			this.email = res['email'];
			this.cnpj = res['cnpj'];

			this.BuscaLatLngService.getlatlng(endereco).subscribe(data => {
				const resLatLng = data['results'];
				this.lat = resLatLng[0].geometry.location.lat;
				this.lng = resLatLng[0].geometry.location.lng;

				localStorage.setItem('geocode', JSON.stringify(resLatLng[0].geometry.location));

				this.registrationSteps = 2;

			}, errr => {
				console.log(errr);
			});

		}, err => {
			console.log(err);
		});
	}

	backStep() {
		if (this.registrationSteps === 3) {
			this.registrationSteps = 2;
		} else if (this.registrationSteps === 2) {
			this.cnpj = null;
			this.registrationSteps = 1;
		}
	}

	nextStep() {
		this.registrationSteps = 3;
	}

	toggleNavbar() {
		this.navbarOpen = !this.navbarOpen;
	}

	onSubmit(form: NgForm) {

		const geo = JSON.parse(localStorage.getItem('geocode'));
		const receita = JSON.parse(localStorage.getItem('dadosReceita'));
		const f = form.value;

		// gravando no database firebase
		this.db.list('/entidades').push({
			geo: geo,
			receita: receita,
			form: f
		});

		console.log('## onsubmit ##');

		this.modalRef.hide();

		this.salvo = true;
		this.registrationSteps = 4;
	}

	// test envio e-mail Cloud Functions firebase
	enviaEmail() {
		// está aqui como teste por enquanto
		this.EnviaEmailService.sendEmail();
	}

}
