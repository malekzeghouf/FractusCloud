import { Component } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email:FormControl = new FormControl('');
  msgDisplay:string|null = null;
  //forgetPassword

  constructor(

    private service: UserService,
    private router: Router

  ) {}

  forgetPassword(event: Event) {
    event.preventDefault()
    let emailPassed= this.email.value
    this.service.forgetPassword(emailPassed).subscribe(
      resonse => {
        this.msgDisplay = "check your email for link "
      }
    )
    this.router.navigate(['/login'])

  }
}
