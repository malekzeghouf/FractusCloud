import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserListComponent } from './User/user-list/user-list.component';
import { UpdateUserComponent } from './User/update-user/update-user.component';
import { LoginComponent } from "./User/login/login.component";
import { NgxCaptchaModule } from 'ngx-captcha';
import { RegisterComponent } from './User/register/register/register.component';
import { ForgotPasswordComponent } from './User/forgot-password/forgot-password.component';
import { ResetPassComponent } from './User/reset-pass/reset-pass.component';
import { NotFoundComponent } from './404/not-found/not-found.component';
import { AjouterBlocComponent } from './bloc/ajouter-bloc/ajouter-bloc.component';
import { AfficherBlocComponent } from './bloc/afficher-bloc/afficher-bloc.component';
import { ModifierBlocComponent } from './bloc/modifier-bloc/modifier-bloc.component';
import { AjouterReservationComponent } from './reservation/ajouter-reservation/ajouter-reservation.component';
import { AfficherReservationComponent } from './reservation/afficher-reservation/afficher-reservation.component';
import { ModifierReservationComponent } from './reservation/modifier-reservation/modifier-reservation.component';
import { AfficherSalleFrontComponent } from './salle/afficher-salle-front/afficher-salle-front.component';
import { AjouterReservationFrontComponent } from './reservation/ajouter-reservation-front/ajouter-reservation-front.component';
import { MapComponent } from './map/map.component';
import { AjouterSalleComponent } from './salle/ajouter-salle/ajouter-salle.component';
import { AfficherSalleComponent } from './salle/afficher-salle/afficher-salle.component';
import { ModifierSalleComponent } from './salle/modifier-salle/modifier-salle.component';
import { MerciComponent } from './front/merci/merci.component';
import { AddcoursComponent } from './cours/addcours/addcours.component';
import { UpdatecoursComponent } from './cours/updatecours/updatecours.component';
import { GetcoursComponent } from './cours/getcours/getcours.component';
import { MeetComponent } from './meet/meet.component';

import { ParticipationComponent } from './frontCours/participation/participation.component';
import { Front1Component } from './frontCours/front1/front1.component';
import {UserFrontComponent} from "./front/user-front.component";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {AfficherDocumentComponent} from "./document/afficher-document/afficher-document.component";
import {AfficherDocumentFrontComponent} from "./document/afficher-document-front/afficher-document-front.component";
import {AjouterDocumentComponent} from "./document/ajouter-document/ajouter-document.component";
import {ModifierDocumentComponent} from "./document/modifier-document/modifier-document.component";
import {AfficherRendezVousComponent} from "./rendez-vous/afficher-rendez-vous/afficher-rendez-vous.component";
import {AjouterRendezVousComponent} from "./rendez-vous/ajouter-rendez-vous/ajouter-rendez-vous.component";
import {
  AjouterRendezVousFrontComponent
} from "./rendez-vous/ajouter-rendez-vous-front/ajouter-rendez-vous-front.component";
import {ModifierRendezVousComponent} from "./rendez-vous/modifier-rendez-vous/modifier-rendez-vous.component";
import {AvisFormComponent} from "./rendez-vous/avis-form/avis-form.component";
import { ProjetfrontComponent } from './Projet/projetfront/projetfront.component';

/*  gestion projet*/
import { Projetfront1Component } from './projetfront1/projetfront1.component';
import { CollaborationsComponent } from './collaborations/collaborations.component';
import { GetallComponent } from './Projet/getall/getall.component';
import { AjoutComponent } from './Projet/ajout/ajout.component';
import { UpdateComponent } from './Projet/update/update.component';
import {StatComponent} from "./stat/stat.component";
import {FrontComponent} from "./frontCours/front/front.component";








@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,

    UserListComponent,
    UpdateUserComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPassComponent,
    NotFoundComponent,
    UserFrontComponent,
    FooterComponent,
    HeaderComponent,


    AjouterSalleComponent,
    AfficherSalleComponent,
    ModifierSalleComponent,
    AjouterBlocComponent,
    AfficherBlocComponent,
    ModifierBlocComponent,
    AjouterReservationComponent,
    AfficherReservationComponent,
    ModifierReservationComponent,
    AfficherSalleFrontComponent,
    AjouterReservationFrontComponent,
    MapComponent,
    MerciComponent,



    AfficherDocumentComponent,
    AfficherDocumentFrontComponent,
    AjouterDocumentComponent,
    ModifierDocumentComponent,
    AfficherRendezVousComponent,
    AjouterRendezVousComponent,
    AjouterRendezVousFrontComponent,
    ModifierRendezVousComponent,
    AvisFormComponent,

    GetallComponent,
    AjoutComponent,
    UpdateComponent,
    ProjetfrontComponent,


    Projetfront1Component,
    CollaborationsComponent,




    AddcoursComponent,
    UpdatecoursComponent,
    GetcoursComponent,
    MeetComponent,
    StatComponent,

    ParticipationComponent,
    Front1Component,
    FrontComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxCaptchaModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
