import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddcoursComponent } from './cours/addcours/addcours.component';
import { UpdatecoursComponent } from './cours/updatecours/updatecours.component';
import { GetcoursComponent } from './cours/getcours/getcours.component';
import { UserListComponent } from './User/user-list/user-list.component';
import { UpdateUserComponent } from './User/update-user/update-user.component';
import { LoginComponent } from "./User/login/login.component";
import { NgxCaptchaModule } from 'ngx-captcha';
import { RegisterComponent } from './User/register/register/register.component';
import { ForgotPasswordComponent } from './User/forgot-password/forgot-password.component';
import { ResetPassComponent } from './User/reset-pass/reset-pass.component';
import { NotFoundComponent } from './404/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AddcoursComponent,
    UpdatecoursComponent,
    GetcoursComponent,
    UserListComponent,
    UpdateUserComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPassComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxCaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
