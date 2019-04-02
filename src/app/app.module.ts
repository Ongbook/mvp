import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { BuscaCnpjService } from './busca-cnpj.service';
import { BuscaLatLngService } from './busca-lat-lng.service';
import { EnviaEmailService } from './envia-email.service';
import { AuthService } from './auth.service';
import { EntidadeService } from './entidade.service';

import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import {NgxMaskModule} from 'ngx-mask';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MapsComponent } from './maps/maps.component';
import { MapaCadastroComponent } from './mapa-cadastro/mapa-cadastro.component';
import { ModalEntityProfileComponent } from './maps/modal-entity-profile/modal-entity-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapsComponent,
    MapaCadastroComponent,
    ModalEntityProfileComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgxMaskModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAfTxzWAW7ExaxT4-Sa7o7MxXPeiY6656A',
      libraries: ['places']
    }),
    AgmJsMarkerClustererModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  
  ],
  providers: [BuscaCnpjService, BuscaLatLngService, EnviaEmailService, AuthService, EntidadeService],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalEntityProfileComponent
  ]
})
export class AppModule { }
