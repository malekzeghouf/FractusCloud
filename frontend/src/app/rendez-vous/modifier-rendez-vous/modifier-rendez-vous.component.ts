import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RendezVousService } from '../rendez-vous.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-modifier-rendez-vous',
  templateUrl: './modifier-rendez-vous.component.html',
  styleUrls: ['./modifier-rendez-vous.component.css']
})
export class ModifierRendezVousComponent {
  id: number = this.activatedRoute.snapshot.params["id"];
  updateRendezVousForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private rdvService: RendezVousService,
    private fb: FormBuilder,
    private router: Router
  ){}


  ngOnInit(){
    this.updateRendezVousForm = this.fb.group({
      id: this.id,
      dateRdv: [ null , [Validators.required]],
      description : [ null , [Validators.required]],
      titre  : [ null , [Validators.required]],
      contact : [ null , [Validators.required]],
      heure : [ null , [Validators.required]],
      remarques : [ null , [Validators.required]],
      status: [ null , [Validators.required]],
    })
    this.getRdvById();
  }

  getRdvById(){
    this.rdvService.afficherRendezVousById(this.id).subscribe((res)=>{
      console.log(res);
      const formattedDate = res.dateRdv.split('T')[0];
      this.updateRendezVousForm.patchValue({
        dateRdv: formattedDate,
        description: res.description,
        titre: res.titre,
        contact: res.contact,
        heure: res.heure,
        remarques: res.remarques,
        status: res.status,
      });
    })
  }

  updateRdv(){
    this.rdvService.updateRendezVous(this.id,this.updateRendezVousForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id != null){
        this.router.navigateByUrl("/dashboard/afficherRendezVous");
      }
    })
  }



}
