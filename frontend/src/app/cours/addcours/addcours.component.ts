import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService} from 'src/app/cours/service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-addcours',
  templateUrl: './addcours.component.html',
  styleUrls: ['./addcours.component.css']
})
export class AddcoursComponent {

  validateForm!: FormGroup;

  constructor(private courService: ServiceService,
    private fb: FormBuilder,private router:Router) { }


    ngOnInit() {
      this.validateForm = this.fb.group({

        date: [null, [Validators.required]],
        description: [null, [Validators.required]],
        categorie : [null, [Validators.required]],
        duree :  [null, [Validators.required]],
        prix : [null, [Validators.required]],

        nb_participant: [null, [Validators.required,Validators.max(20)]]

      })
    }

    postCour() {
      this.courService.postCour(this.validateForm.value).subscribe(res => {
        console.log(res)
      })
      this.router.navigate(['/dashboard/affichercours'])
    }

}
