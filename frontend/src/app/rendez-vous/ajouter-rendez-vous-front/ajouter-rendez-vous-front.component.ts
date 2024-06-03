import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RendezVousService } from '../rendez-vous.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-rendez-vous-front',
  templateUrl: './ajouter-rendez-vous-front.component.html',
  styleUrls: ['./ajouter-rendez-vous-front.component.css']
})
export class AjouterRendezVousFrontComponent {

  postRendezVousForm! : FormGroup ;

  constructor(private RendezVousService:RendezVousService ,
    private fb:FormBuilder,
    private router: Router ){}

  ngOnInit(){
    this.postRendezVousForm = this.fb.group({
      dateRdv: [ null , [Validators.required]],
      description : [ null , [Validators.required]],
      titre  : [ null , [Validators.required]],
      contact : [ null , [Validators.required]],
      heure : [ null , [Validators.required]],
      remarques : [ null , [Validators.required]],
      status: [ null , [Validators.required]],
    })
  }

  postRendezVous(){
    console.log(this.postRendezVousForm.value)
    this.RendezVousService.postRendezVous(1,this.postRendezVousForm.value).subscribe((res) =>{
      console.log(res);
    })

    }


}
