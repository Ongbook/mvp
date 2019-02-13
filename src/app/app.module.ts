import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { BuscaCnpjService } from './busca-cnpj.service';
import { BuscaLatLngService } from './busca-lat-lng.service';
import { EnviaEmailService } from './envia-email.service';

import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MapsComponent } from './maps/maps.component';
import { MapaCadastroComponent } from './mapa-cadastro/mapa-cadastro.component';
import { ModalEntityProfileComponent } from './maps/modal-entity-profile/modal-entity-profile.component';
import {NgxMaskModule} from 'ngx-mask';
import { ComponentCnpjComponent } from './component-cnpj/component-cnpj.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapsComponent,
    MapaCadastroComponent,
    ModalEntityProfileComponent,
    ComponentCnpjComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAfTxzWAW7ExaxT4-Sa7o7MxXPeiY6656A',
      libraries: ['places']
    }),
    AgmJsMarkerClustererModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxMaskModule.forRoot()
  ],
  providers: [BuscaCnpjService, BuscaLatLngService, EnviaEmailService],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalEntityProfileComponent
  ]
})
export class AppModule { }
