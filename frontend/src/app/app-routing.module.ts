import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';

import { AddcoursComponent } from './cours/addcours/addcours.component';
import { UpdatecoursComponent } from './cours/updatecours/updatecours.component';
import { GetcoursComponent } from './cours/getcours/getcours.component';
import { UserListComponent } from "./User/user-list/user-list.component"
import {UpdateUserComponent} from "./User/update-user/update-user.component";
import {LoginComponent} from "./User/login/login.component";
import {AuthGuard} from "./Helper/auth.guard";
import {RegisterComponent} from "./User/register/register/register.component";
import {ForgotPasswordComponent} from "./User/forgot-password/forgot-password.component";
import {ResetPassComponent} from "./User/reset-pass/reset-pass.component";
import {NotFoundComponent} from "./404/not-found/not-found.component";
import { AjouterSalleComponent } from './salle/ajouter-salle/ajouter-salle.component';
import { AfficherSalleComponent } from './salle/afficher-salle/afficher-salle.component';
import { AfficherSalleFrontComponent } from './salle/afficher-salle-front/afficher-salle-front.component';
import { ModifierSalleComponent } from './salle/modifier-salle/modifier-salle.component';
import { AjouterBlocComponent } from './bloc/ajouter-bloc/ajouter-bloc.component';
import { AfficherBlocComponent } from './bloc/afficher-bloc/afficher-bloc.component';
import { ModifierBlocComponent } from './bloc/modifier-bloc/modifier-bloc.component';
import { AjouterReservationComponent } from './reservation/ajouter-reservation/ajouter-reservation.component';
import { AjouterReservationFrontComponent } from './reservation/ajouter-reservation-front/ajouter-reservation-front.component';
import { AfficherReservationComponent } from './reservation/afficher-reservation/afficher-reservation.component';
import { ModifierReservationComponent } from './reservation/modifier-reservation/modifier-reservation.component';
import { MapComponent } from './map/map.component';
import { MerciComponent } from './front/merci/merci.component';
import {UserFrontComponent} from "./front/user-front.component";
import {AjouterRendezVousComponent} from "./rendez-vous/ajouter-rendez-vous/ajouter-rendez-vous.component";
import {AfficherRendezVousComponent} from "./rendez-vous/afficher-rendez-vous/afficher-rendez-vous.component";
import {ModifierRendezVousComponent} from "./rendez-vous/modifier-rendez-vous/modifier-rendez-vous.component";
import {ModifierDocumentComponent} from "./document/modifier-document/modifier-document.component";
import {AjouterDocumentComponent} from "./document/ajouter-document/ajouter-document.component";
import {AfficherDocumentComponent} from "./document/afficher-document/afficher-document.component";
import {AvisFormComponent} from "./rendez-vous/avis-form/avis-form.component";
import {
  AjouterRendezVousFrontComponent
} from "./rendez-vous/ajouter-rendez-vous-front/ajouter-rendez-vous-front.component";
import {AfficherDocumentFrontComponent} from "./document/afficher-document-front/afficher-document-front.component";
import {UpdateComponent} from "./Projet/update/update.component";
import {GetallComponent} from "./Projet/getall/getall.component";
import {AjoutComponent} from "./Projet/ajout/ajout.component";
import {Projetfront1Component} from "./projetfront1/projetfront1.component";
import {ProjetfrontComponent} from "./Projet/projetfront/projetfront.component";
import {FrontComponent} from "./frontCours/front/front.component";
import {ParticipationComponent} from "./frontCours/participation/participation.component";
import {Front1Component} from "./frontCours/front1/front1.component";
import {StatComponent} from "./stat/stat.component";


const routes: Routes = [

  /* Back Routes */
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component : LoginComponent},


  { path: 'dashboard', component: AdminComponent ,
    children: [
      { path: 'afficherUser', component : UserListComponent},


      /* Aziz Routes */
      { path: 'ajouterSalle', component: AjouterSalleComponent },
      { path: 'afficherSalle', component: AfficherSalleComponent },
      { path: 'modifierSalle/:id', component: ModifierSalleComponent },
      { path: 'ajouterBloc', component: AjouterBlocComponent },
      { path: 'afficherBloc', component: AfficherBlocComponent },
      { path: 'modifierBloc/:id', component: ModifierBlocComponent },
      { path: 'ajouterReservation/:id', component: AjouterReservationComponent },
      { path: 'afficherReservation', component: AfficherReservationComponent },
      { path: 'modifierReservation/:id', component: ModifierReservationComponent },
      { path: 'map', component: MapComponent },

      /* Houssem Routes */
      { path: 'ajouterRendezVous', component: AjouterRendezVousComponent },
      { path: 'afficherRendezVous', component:  AfficherRendezVousComponent},
      { path: 'modifierRendezVous/:id', component:   ModifierRendezVousComponent },
      { path: 'modifierDocument/:id', component:   ModifierDocumentComponent },
      { path: 'ajouterDocument', component: AjouterDocumentComponent },
      { path: 'afficherDocument', component:  AfficherDocumentComponent},
      { path: 'rate/:rdv', component:  AvisFormComponent},

      /* Hichem Routes */

      { path: 'ajouterprojet', component: AjoutComponent },
      { path: 'afficherprojet', component: GetallComponent},
      {path: 'modifierprojet/:id', component: UpdateComponent},

      /*chaima*/

      { path: 'addcour', component: AddcoursComponent},
      { path: 'update/:id', component : UpdatecoursComponent},
      { path: 'affichercours', component : GetcoursComponent},
      {path: 'stat', component:StatComponent},



    ] , canActivate: [AuthGuard] },



  //Front Routes
  { path: 'front', component: UserFrontComponent,
    children: [

      /* Aziz Routes */
      { path: 'afficherSalleFront', component : AfficherSalleFrontComponent},
      { path: 'merci', component: MerciComponent },
      { path: 'ajouterReservationFront/:id', component: AjouterReservationFrontComponent },
      { path: 'map', component: MapComponent },


      /* Houssem Routes */
      { path: 'ajouterRendezVousFront', component:  AjouterRendezVousFrontComponent},
      { path: 'afficherDocumentFront', component:  AfficherDocumentFrontComponent},
      { path: 'rate/:rdv', component:  AvisFormComponent},

      /* Hichem Routes*/
      {path: 'projetfront', component: ProjetfrontComponent},
      {path: 'front1', component:Projetfront1Component},

      /*chaima*/

      { path: 'consomme', component:FrontComponent},
      { path: 'participation', component:ParticipationComponent},

      { path: 'frontCours', component:Front1Component},



    ] , canActivate: [AuthGuard] },










  { path: 'updateUser/:id', component : UpdateUserComponent,  canActivate: [AuthGuard] },

  { path: 'addcour', component: AddcoursComponent, canActivate: [AuthGuard]},

  { path: 'affichercours', component : GetcoursComponent, canActivate: [AuthGuard]},

  { path: 'update/:id', component : UpdatecoursComponent, canActivate: [AuthGuard]},

  { path: 'register', component : RegisterComponent },
  { path: 'forgot-password', component : ForgotPasswordComponent },
  { path: 'reset-password', component : ResetPassComponent },
  { path:"**", component : NotFoundComponent  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
