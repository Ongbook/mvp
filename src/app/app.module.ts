import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { BuscaCnpjService } from './services/busca-cnpj.service';
import { BuscaLatLngService } from './services/busca-lat-lng.service';
import { EnviaEmailService } from './services/envia-email.service';

import { AgmCoreModule } from '@agm/core';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { MapaCadastroComponent } from './components/mapa-cadastro/mapa-cadastro.component';

@NgModule({
  declarations: [
  AppComponent,
  HomeComponent,
  MapaComponent,
  MapaCadastroComponent
  ],
  imports: [
  BrowserModule,
  FormsModule,
  HttpClientModule,
  BsDropdownModule.forRoot(),
  TooltipModule.forRoot(),
  ModalModule.forRoot(),
  AgmCoreModule.forRoot({
    apiKey: 'AIzaSyAfTxzWAW7ExaxT4-Sa7o7MxXPeiY6656A',
    libraries: ['places']
  }),
  AngularFireDatabaseModule,
  AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [ BuscaCnpjService, BuscaLatLngService, EnviaEmailService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
