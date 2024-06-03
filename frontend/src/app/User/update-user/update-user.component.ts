import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ServiceService} from "../../cours/service.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  validateForm!: FormGroup;
  id: any = this.activatedRoute.snapshot.params['id']

  constructor(private UserService: UserService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getUsersById();
  }



  getUsersById() {
    this.UserService.getUserById(this.id).subscribe((res) => {
      console.log(res);
      this.validateForm.patchValue(res);
    })
  }


}
