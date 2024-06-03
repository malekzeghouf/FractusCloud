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


const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component : LoginComponent},

  { path: 'dashboard', component: AdminComponent ,
    children: [
      { path: 'afficherUser', component : UserListComponent}
    ] , canActivate: [AuthGuard] },



  { path: 'updateUser/:id', component : UpdateUserComponent,  canActivate: [AuthGuard] },

  { path: 'addcour', component: AddcoursComponent, canActivate: [AuthGuard]},

  { path: 'affichercours', component : GetcoursComponent, canActivate: [AuthGuard]},

  { path: 'update/:id', component : UpdatecoursComponent, canActivate: [AuthGuard]},

  { path: 'register', component : RegisterComponent },
  { path: 'forgot-password', component : ForgotPasswordComponent },
  { path: 'reset-password', component : ResetPassComponent },
  { path:"**", component : NotFoundComponent  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
