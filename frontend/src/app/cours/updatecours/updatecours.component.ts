import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ServiceService} from 'src/app/cours/service.service';

@Component({
  selector: 'app-updatecours',
  templateUrl: './updatecours.component.html',
  styleUrls: ['./updatecours.component.css']
})
export class UpdatecoursComponent {

  validateFormUpdate!: FormGroup;
  id: any = this.activatedRoute.snapshot.params['id']

  constructor(private courService: ServiceService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
              private router:Router) { }

    ngOnInit() {
      this.validateFormUpdate = this.fb.group({
       idCours : this.id,
       date: [null, [Validators.required]],
       description: [null, [Validators.required]],
       categorie : [null, [Validators.required]],
       duree :  [null, [Validators.required]],
       prix : [null, [Validators.required]],

       nb_participant: [null, [Validators.required]]
      })
      this.getCoursById();
    }



  getCoursById() {
    this.courService.getCourById(this.id).subscribe((res) => {
      console.log(res);
      this.validateFormUpdate.patchValue(res);
    })
  }

  updatecour(){
    this.courService.updateCours(this.id,this.validateFormUpdate.value).subscribe((res) => {
      console.log(res);
    })
    this.router.navigate(['/dashboard/affichercours'])
  }

}
