import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AuthService } from './auth.service';
import { BuscaCnpjService } from './busca-cnpj.service';
import { BuscaLatLngService } from './busca-lat-lng.service';
import { EntidadeService } from './entidade.service';
import { EnviaEmailService } from './envia-email.service';

import { AgmCoreModule } from '@agm/core';
import { AgmMarkerClustererModule } from '@agm/markerclusterer';

import { NgxMaskModule } from 'ngx-mask';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MapaCadastroComponent } from './mapa-cadastro/mapa-cadastro.component';
import { MapsComponent } from './maps/maps.component';
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
      apiKey: 'AIzaSyBlnVck-Tc2xx9RveTQAIyGSZNI5TSOpT4',
      libraries: ['places']
    }),
    AgmMarkerClustererModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)

  ],
  providers: [BuscaCnpjService, BuscaLatLngService, EnviaEmailService, AuthService, EntidadeService],
  bootstrap: [AppComponent]
})
export class AppModule { }