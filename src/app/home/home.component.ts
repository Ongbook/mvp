import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

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

	lat: Number;
	lng: Number;

	navbarOpen: Boolean = false;
	registrationSteps: Number = 1;
	labelStep: Number;
	salvo: Boolean = false;

	public modalRef: BsModalRef;

	public formCadastro: FormGroup;

	constructor(private modalService: BsModalService, private BuscaCnpjService: BuscaCnpjService,
		private BuscaLatLngService: BuscaLatLngService, private db: AngularFireDatabase, private EnviaEmailService: EnviaEmailService) {

			this.formCadastro = new FormGroup({
				cnpj: new FormControl(''),
				razaoSocial: new FormControl(''),
				atividadePrincipal: new FormControl(''),
				areaAtuacao: new FormControl(''),
				sigla: new FormControl(''),
				nomeFantasia: new FormControl(''),
				email: new FormControl(''),
				lat: new FormControl(''),
				lng: new FormControl(''),
				receita: new FormControl(''),
				responsavel: new FormGroup({
					nome: new FormControl(''),
					cpf: new FormControl(''),
					email: new FormControl(''),
					senha: new FormControl(''),
					senhaOk: new FormControl('')
				})
			  });
		 }

	ngOnInit() {}

	public openModalEntityRegister(templateEntityRegister: TemplateRef<any>) {
		this.modalRef = this.modalService.show(templateEntityRegister, { backdrop: 'static', keyboard: false });
	}

	findCnpj(value: any) {

		this.BuscaCnpjService.getCnpj(value).subscribe((res) => {

			//concat for google maps
			const endereco = res['logradouro'] + ', ' + res['numero'] + ' - ' + res['bairro'] + ', ' + res['municipio'] + '-' + res['uf'];

			this.formCadastro.controls['cnpj'].setValue(res['cnpj']);
			this.formCadastro.controls['razaoSocial'].setValue(res['nome']);
			this.formCadastro.controls['atividadePrincipal'].setValue(res['atividade_principal'][0].text);
			this.formCadastro.controls['nomeFantasia'].setValue(res['fantasia']);
			this.formCadastro.controls['email'].setValue(res['email']);
			this.formCadastro.controls['receita'].setValue(res);

			this.BuscaLatLngService.getlatlng(endereco).subscribe(data => {
				
				this.formCadastro.controls['lat'].setValue(data['results'][0].geometry.location.lat);
				this.formCadastro.controls['lng'].setValue(data['results'][0].geometry.location.lng);

				this.registrationSteps = 2;

				this.lat = data['results'][0].geometry.location.lat;
				this.lng = data['results'][0].geometry.location.lng;

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
			this.formCadastro.value.cnpj = null;
			this.registrationSteps = 1;
		}
	}

	nextStep() {
		this.registrationSteps = 3;
	}

	toggleNavbar() {
		this.navbarOpen = !this.navbarOpen;
	}

	onSubmit() {

		// gravando no database firebase
		this.db.list('/entidades').push(
			this.formCadastro.value
		);

		this.modalRef.hide();

		this.salvo = true;
		this.registrationSteps = 4;
	}

	// test envio e-mail Cloud Functions firebase
	enviaEmail() {
		this.EnviaEmailService.sendEmail();
	}

}
