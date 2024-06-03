import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { UserService } from "../user.service";
import { Router } from '@angular/router';
import {jwtDecode} from "jwt-decode";
import {VerificationRequest} from "../../Services/models/verification-request";
import {AuthenticationRequest} from "../../Services/models/authentication-request";
import {AuthenticationResponse} from "../../Services/models/authentication-response";
import {Observable} from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  registerForm! : FormGroup;
  authRequest: AuthenticationRequest = {};
  otpCode = '';
  authResponse: AuthenticationResponse= {};
  constructor(

    private service: UserService,
    private fb: FormBuilder,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      mdp: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
  }

  // Custom validator function to check if email ends with '@esprit.tn'
  espritEmailValidator(control: FormControl): { [key: string]: boolean } | null {
    if (!control.value) {
      console.error("mahouch mriquel")
      return null; // If email is empty, let the required validator handle it
    }

    const emailPattern = /@esprit\.tn$/;
    if (!emailPattern.test(control.value)) {
      return { 'invalidEspritEmail': true } ;
    }

    return null;
  }


  siteKey : string="6LenHsspAAAAAMwzFlAqihYKA5-CoZrEPSW46wGO\n";

  /*
  * login() {
    event?.preventDefault();
    this.loginRequestPayload.email=this.loginForm.get('email')?.value;
    this.loginRequestPayload.password=this.loginForm.get('password')?.value;
    this.authService.login(this.loginRequestPayload).subscribe((response:any)=>{

      const token=response.token;


        const tokenPayload: any = jwtDecode(token);
        const userRole = tokenPayload.roles;
        if (userRole && userRole.includes('USER')) {



          this._router.navigate(['/frontOffice']);
        } else if (userRole && userRole.includes('ADMIN')) {
          this._router.navigate(['/backOffice/listAnnonce']).then(()=>{
            window.location.reload();
          });

        } else {
          console.log("error")
        }

        this.toast.success("Accesso effettuato con successo");

    },error => {
      console.log(error);
    })
  }
  * */
  login() {
    // Make the login request to the backend API using the UserService
    this.service.login(this.registerForm.value).subscribe(
      (response:any) => {
        const accessToken = response.accessToken;
        console.dir(accessToken);
       //localStorage.getItem('token');
        // Decode the access token to get the payload
        const tokenPayload: any = jwtDecode(accessToken);

          if(tokenPayload.role === 'ADMIN')
          {
            this.router.navigate(['/dashboard'])
          }
        if(tokenPayload.role === 'ETUDIANT')
        {
          this.router.navigate([''])
        }
      }
    );

  }
  handleSuccess(event: any) {
    // Handle success event here
    console.log('reCAPTCHA success:', event);
  }



}
