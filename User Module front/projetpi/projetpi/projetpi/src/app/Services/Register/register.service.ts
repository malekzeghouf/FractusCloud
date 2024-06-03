import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../models/register-request";
import {AuthenticationRequest} from "../models/authentication-request";
import {AuthenticationResponse} from "../models/authentication-response";
import {VerificationRequest} from "../models/verification-request";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }
  Register(body:RegisterRequest) {
    return this.http.post<AuthenticationResponse>
    ("http://localhost:8082/api/v1/auth/register",body);
  }

  verifyCode(verificationRequest: VerificationRequest) {
    return this.http.post<AuthenticationResponse>
    ("http://localhost:8082/api/v1/auth/verify", verificationRequest);
  }
}


