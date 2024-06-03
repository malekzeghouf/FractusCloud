import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ServiceService} from 'src/app/Projet/service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  validateForm!: FormGroup;
  id: any = this.activatedRoute.snapshot.params['id']

  constructor(private ProjetService: ServiceService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
              private router:Router) { }

    ngOnInit() {
      this.validateForm = this.fb.group({
      idprojet: this.id,
      nom: [null,[Validators.required]],
     description:[null,[Validators.required]],
    nombre:[null,[Validators.required]],
    specialite:[null,[Validators.required]],
    })
    this.getbyId();
}
update(){
  this.ProjetService.update(this.validateForm.value,this.id).subscribe((res)=>{

})
  this.router.navigate(['dashboard/afficherprojet'])}
getbyId(){
  this.ProjetService.getbyId(this.id).subscribe((res) => {
    console.log(res);
    this.validateForm.patchValue(res);
  })
}
}
