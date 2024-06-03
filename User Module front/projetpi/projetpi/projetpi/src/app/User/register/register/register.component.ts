import { Component } from '@angular/core';
import {RegisterRequest} from "../../../Services/models/register-request";
import {Router} from "@angular/router";
import {RegisterService} from "../../../Services/Register/register.service";
import {UserService} from "../../user.service";
import {AuthenticationResponse} from "../../../Services/models/authentication-response";
import {VerificationRequest} from "../../../Services/models/verification-request";
import {Validators} from "@angular/forms";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Subject, TimeoutError} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerRequest :RegisterRequest={nom :'',prenom:'', email : '',mdp:'',cin:NaN,dateNaissance:'',numtel:NaN,adresse:'',role:'ETUDIANT'};
  authResponse : AuthenticationResponse ={};
  errorMsg :Array<string>=[];
  message :string ='';
  otpCode :string ='';
  private emailInputSubject = new Subject<string>();
  constructor(
    private router :Router,
    private registerService:RegisterService,
    private tokenService:UserService,
    private http: HttpClient

  )
  { }
  // email validation function
  Register(){
    this.errorMsg=[];
    this.message="";
    let emailV = this.registerRequest.email
    // Check if email is valid
    if (!this.isEspritEmail(emailV!)) {
      this.errorMsg.push("Email must end with '@esprit.tn'");
      return;
    }
    // Continue with registration logic
    this.registerService.Register(
      this.registerRequest
    ).subscribe({
      next:(res : any)=>{
        if(res){
          this.authResponse=res;
          //this.tokenService.access_token=res.access_token as string;
          //this.tokenService.refresh_token=res.refresh_token as string;
          //this.router.navigate(['login']);
        }
        else{
          this.message="Compte crée avec succées";
          setTimeout(()=>{
            this.router.navigate(['login']);
          }),3000
        }

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  checkappelTfa() {
    console.log("checkappelTfa called");
    console.log("Before update:", this.authResponse.mfEnabled);
    this.authResponse.mfEnabled = this.registerRequest.mfEnabled;
    console.log("After update:", this.authResponse.mfEnabled);
  }
  verifyTfa() {
    console.log("verifyTfa is called")
    this.message = '';
    const verifyRequest: VerificationRequest = {
      email: this.registerRequest.email,
      code: this.otpCode
    };
    console.log(this.otpCode);
    this.registerService.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          this.message = 'Account created successfully\nYou will be redirected to the Welcome page in 3 seconds';
          setTimeout(() => {
            localStorage.setItem('access_token', response.accessToken as string);
            this.router.navigate(['dashboard']);
          }, 3000);
        }
      });
  }

  login(){
    this.router.navigate(['login']);
  }




  /////////////////////////////////
  // Custom validator function to check if email ends with '@esprit.tn'
  espritEmailValidator(control: any): { [key: string]: boolean } | null {
    const email: string = control.value;
    if (email && !email.endsWith('@esprit.tn')) {
      return { 'invalidEspritEmail': true };
    }
    return null;
  }



  // api to verify account exist or not
  onEmailInput(event: any ) {
    const emailFromInput = this.registerRequest.email;

    if (emailFromInput === '') {
      this.errorMsg = [];
      return;
    }

    // Perform API call after a delay of 5000ms (5 seconds)
    this.tokenService.checkUserByEmail(emailFromInput).subscribe(response => {
      console.log(response.status);
      console.log(response.body);
      if (emailFromInput && emailFromInput.endsWith('@esprit.tn')) {
        this.errorMsg.push(response.body);
      }
    });
  }
  // Function to check if email ends with '@esprit.tn'
  isEspritEmail(email: string): boolean {
    return email.endsWith('@esprit.tn');
  }




}


