import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BuscaCnpjService } from '../busca-cnpj.service';
import { BuscaLatLngService } from '../busca-lat-lng.service';
import { EnviaEmailService } from '../envia-email.service';
import { EntidadeService } from '../entidade.service';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs';

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
	msgErro: String = '';

	public modalRef: BsModalRef;
	public customPatterns = { '0': { pattern: new RegExp('\[0-9\]') } };

	public formCadastro: FormGroup;

	private subCnpj;
	private subSigla;

	constructor(private modalService: BsModalService, private BuscaCnpjService: BuscaCnpjService,
		private BuscaLatLngService: BuscaLatLngService, private EnviaEmailService: EnviaEmailService,
		private authService: AuthService, private entidadeService: EntidadeService) {

		this.iniciaValidacaoSiglaCnpj();

		this.formCadastro = new FormGroup({
			cnpj: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^\\d{14}$'))]),
			razaoSocial: new FormControl({value: '', disabled: true}),
			atividadePrincipal: new FormControl(''),
			areaAtuacao: new FormControl('selecione', [Validators.required]),
			sigla: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
			nomeFantasia: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(125)]),
			email: new FormControl('', [Validators.required, Validators.email]),
			lat: new FormControl(''),
			lng: new FormControl(''),
			receita: new FormControl(''),
			responsavel: new FormGroup({
				uid: new FormControl(''),
				nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(125)]),
				cpf: new FormControl(''),
				emailResponsavel: new FormControl('', [Validators.required, Validators.email]),
				senha: new FormControl(''),
				senhaOk: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(125)])
			})
		});
	}

	ngOnInit() { }

	public openModalEntityRegister(templateEntityRegister: TemplateRef<any>) {
		this.modalRef = this.modalService.show(templateEntityRegister, { backdrop: 'static', keyboard: false });
	}

	public openModalSobre(templateSobre: TemplateRef<any>) {
		this.modalRef = this.modalService.show(templateSobre);
	}

	buscaCnpj() {

		let cnpj = this.formCadastro.controls['cnpj'].value;

		this.BuscaCnpjService.getCnpj(cnpj).subscribe((res) => {

			if (res['status'] === 'ERROR') {

				this.msgErro = res['message'] + '.';

				this.aguardaMsgErro()

				return;
			} else {

				this.validaCNPJ(res);

			}

		}, err => {
			console.log(err);
			this.msgErro = 'Erro ao buscar CNPJ.'
			this.aguardaMsgErro();
		});

	}

	validaCNPJ(obj: any) {

		let naturezaJuridica: String = obj['natureza_juridica'];

		if (naturezaJuridica.match(new RegExp('^399-9')) ||
			naturezaJuridica.match(new RegExp('^306-9'))) {

			return this.verificaCnpjCadastrado(obj);

		} else {

			this.msgErro = "Natureza jurídica inválida.";

			this.aguardaMsgErro();

			return false;
		}
	}

	verificaCnpjCadastrado(obj: any) {

		let cnpj: string = this.formCadastro.controls['cnpj'].value

		this.subCnpj = this.entidadeService.recuperaEntidadePorCnpj(cnpj)
			.subscribe((res) => {

				if (res[0] !== undefined) {

					this.msgErro = "CNPJ já cadastrado.";
					this.aguardaMsgErro();
					return;

				} else {

					this.buscaLatitudeLongitude(obj);
				}
			});


	}

	buscaLatitudeLongitude(obj: any) {

		const endereco = obj['logradouro'] + ', ' + obj['numero'] + ' - ' + obj['bairro'] + ', ' + obj['municipio'] + '-' + obj['uf'];

		this.BuscaLatLngService.getlatlng(endereco).subscribe(data => {

			if (data['status'] != "OK") {
				this.msgErro = "Erro ao buscar CNPJ.";
				this.aguardaMsgErro();
				return;
			}
			this.formCadastro.controls['razaoSocial'].setValue(obj['nome']);
			this.formCadastro.controls['atividadePrincipal'].setValue(obj['atividade_principal'][0].text);
			this.formCadastro.controls['nomeFantasia'].setValue(obj['fantasia']);
			this.formCadastro.controls['email'].setValue(obj['email']);
			this.formCadastro.controls['receita'].setValue(obj);

			this.formCadastro.controls['lat'].setValue(data['results'][0].geometry.location.lat);
			this.formCadastro.controls['lng'].setValue(data['results'][0].geometry.location.lng);

			this.registrationSteps = 2;

			this.lat = data['results'][0].geometry.location.lat;
			this.lng = data['results'][0].geometry.location.lng;

		}, errr => {
			console.log(errr);
			this.msgErro = 'Erro ao buscar CNPJ.'
			this.aguardaMsgErro();
		});
	}

	validaSigla() {

		let sigla: String = this.formCadastro.controls['sigla'].value;
		sigla = sigla.toLowerCase();
		this.formCadastro.controls['sigla'].setValue(sigla);

		this.subSigla = this.entidadeService.recuperaEntidadePorSigla(sigla.toString())
			.subscribe((res) => {

				if (res[0] !== undefined) {

					this.msgErro = "Sigla já existente.";
					this.aguardaMsgErro();
					this.formCadastro.controls['sigla'].setErrors({ 'incorrect': true });

				} else {

					this.msgErro = "";
				}
			});
	}

	backStep() {
		if (this.registrationSteps === 3) {
			this.registrationSteps = 2;
		} else if (this.registrationSteps === 2) {
			this.formCadastro.reset();
			this.formCadastro.controls['areaAtuacao'].setValue('selecione');
			this.registrationSteps = 1;
		}
	}

	toggleNavbar() {
		this.navbarOpen = !this.navbarOpen;
	}

	aguardaMsgErro() {

		setTimeout(() => {

			this.msgErro = '';
		}, 4000);
	}

	onSubmit() {
		let email = this.formCadastro.controls['responsavel'].value['emailResponsavel'];
		let senha = this.formCadastro.controls['responsavel'].value['senhaOk'];

		let nomeFantasia: String = this.formCadastro.controls['nomeFantasia'].value;
		nomeFantasia = nomeFantasia.toUpperCase();
		this.formCadastro.controls['nomeFantasia'].setValue(nomeFantasia);

		this.authService.criaUsuarioEntidade(email, senha)
			.then((res) => {

				if (res['code'] == "auth/email-already-in-use") {

					this.msgErro = "Este email já está em uso.";
					this.aguardaMsgErro();
					return;

				} else if (res['code'] != undefined) {

					this.msgErro = "Erro ao cadastrar responsável.";
					this.aguardaMsgErro();
					return;

				} else {
					this.msgErro = "";
					this.formCadastro.controls['responsavel'].get('uid').setValue(res);
					this.criaEntidade();
				}

			}).catch((err) => {

				this.msgErro = "Erro ao cadastrar responsável.";
				this.aguardaMsgErro();
				console.log(err)
			});
	}

	criaEntidade() {

		this.subCnpj.unsubscribe();
		this.subSigla.unsubscribe();

		this.entidadeService.criaEntidade(this.formCadastro)
			.then((res) => {

				if (res == 'sucesso') {

					this.salvo = true;
					this.msgErro = "";
					this.registrationSteps = 4;
					return;

				} else {

					this.msgErro = "Erro ao cadastrar entidade.";
					this.aguardaMsgErro();
					this.iniciaValidacaoSiglaCnpj();
				}

			}).catch((err) => {
				this.msgErro = "Erro ao cadastrar entidade.";
				this.aguardaMsgErro();
				this.iniciaValidacaoSiglaCnpj();
				console.log(err)
			});

	}

	iniciaValidacaoSiglaCnpj() {
		this.subCnpj = new Subject();
		this.subSigla = new Subject();
	}

	validaSelecioneAreaAtuacao() {
		return {
			'is-invalid': this.formCadastro.get('areaAtuacao').touched && this.formCadastro.get('areaAtuacao').value == 'selecione'
		}
	}

	aplicaCSSerro(campo: string) {
		return {
			'is-invalid': this.formCadastro.get(campo).touched && !this.formCadastro.get(campo).valid
		}
	}

	aplicaCSSerroInputsResponsavel(campo: string) {
		return {
			'is-invalid': this.formCadastro.controls['responsavel'].get(campo).touched && !this.formCadastro.controls['responsavel'].get(campo).valid
		}
	}

	// test envio e-mail Cloud Functions firebase
	enviaEmail() {
		this.EnviaEmailService.sendEmail();
	}

}
