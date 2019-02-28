import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BuscaCnpjService } from '../busca-cnpj.service';
import { BuscaLatLngService } from '../busca-lat-lng.service';
import { EnviaEmailService } from '../envia-email.service';
import { EntidadeService } from '../entidade.service';
import { AuthService } from '../auth.service';

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
		private BuscaLatLngService: BuscaLatLngService, private EnviaEmailService: EnviaEmailService,
		private authService: AuthService, private entidadeService: EntidadeService) {

		this.formCadastro = new FormGroup({
			cnpj: new FormControl(''),
			razaoSocial: new FormControl(''),
			atividadePrincipal: new FormControl(''),
			areaAtuacao: new FormControl(''),
			sigla: new FormControl(''),
			nomeFantasia: new FormControl(''),
			email: new FormControl('', [Validators.required, Validators.email]),
			lat: new FormControl(''),
			lng: new FormControl(''),
			receita: new FormControl(''),
			responsavel: new FormGroup({
				uid: new FormControl(''),
				nome: new FormControl(''),
				cpf: new FormControl(''),
				emailResponsavel: new FormControl('', [Validators.required, Validators.email]),
				senha: new FormControl('', [Validators.required]),
				senhaOk: new FormControl('', [Validators.required])
			})
		});
	}

	ngOnInit() { this.registrationSteps == 2 }

	public openModalEntityRegister(templateEntityRegister: TemplateRef<any>) {
		this.modalRef = this.modalService.show(templateEntityRegister, { backdrop: 'static', keyboard: false });
	}

	buscaCnpj(value: any) {

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

		let email = this.formCadastro.controls['responsavel'].value['emailResponsavel'];
		let senha = this.formCadastro.controls['responsavel'].value['senhaOk'];

		this.authService.criaUsuarioEntidade(email, senha)
			.then((uid) => {

				if (uid == "erro" || undefined) {
					//TODO - disparar alerta bootstrap
					console.log("Erro ao criar usuário responsável!")
				} else {

					this.formCadastro.controls['responsavel'].get('uid').setValue(uid);
					this.criaEntidade();
				}

			}).catch((err) => {
				//TODO - disparar alerta bootstrap
				console.log(err)
			});
	}

	criaEntidade() {

		this.entidadeService.criaEntidade(this.formCadastro)
			.then((res) => {

				if (res == 'sucesso') {

					//TODO - disparar alerta bootstrap
					console.log("Entidade cadastrada com sucesso!")

					this.modalRef.hide();

					this.salvo = true;
					this.registrationSteps = 4;
				} else {

					//TODO - disparar alerta bootstrap
					console.log("Erro ao cadastrar entidade!")
				}

			});

	}

	// test envio e-mail Cloud Functions firebase
	enviaEmail() {
		this.EnviaEmailService.sendEmail();
	}

}
