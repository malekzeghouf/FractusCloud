import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css']
})
export class AjoutComponent {
  validateFormupdate!: FormGroup;
  id: any ;
 constructor(private projetService : ServiceService,private fb:FormBuilder, private router:Router){

 }
  ngOnInit(){
            this.validateFormupdate = this.fb.group({
              description : [null,[Validators.required]],
              nombre : [null,[Validators.required]],
              nom : [null,[Validators.required]],

              specialite : [null,[Validators.required]]

            })

  }
  postprojet(){
    this.projetService.postProjet(this.validateFormupdate.value,this.id).subscribe(res=>{
      console.log(res)
  })
    this.router.navigate(['dashboard/afficherprojet'])
      //            this.router.navigate(['dashboard']);
}


}
