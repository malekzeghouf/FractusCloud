import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  password: FormControl = new FormControl('');
  email?: string='';
  constructor(private activatedRoute: ActivatedRoute, private service: UserService, private router: Router) {

  }
  desplayMsg:string|null = null;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
      console.log(this.email); // This will log the email value to the console
    });
  }

  resetPass(event: Event) {
    event.preventDefault();
    let passwordtosend = this.password.value;
    console.log("pass"+passwordtosend);
    this.service.resetPassword(this.email!,passwordtosend).subscribe( (a) => console.log(a)
    )
    this.router.navigate(['/login'] )

  }
}
