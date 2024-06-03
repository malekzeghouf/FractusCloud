import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalleService } from '../salle.service';
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import { BlocService } from 'src/app/bloc/bloc.service';


@Component({
  selector: 'app-modifier-salle',
  templateUrl: './modifier-salle.component.html',
  styleUrls: ['./modifier-salle.component.css']
})
export class ModifierSalleComponent {

  id: number = this.activatedRoute.snapshot.params["id"];

  updateSalleForm!: FormGroup;
  blocs!: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private salleService: SalleService,
    private blocService: BlocService,
    private fb: FormBuilder,
    private router: Router){}

    selectedBlocId !: number;

  ngOnInit(){
    this.updateSalleForm = this.fb.group({
      id: this.id,
      capacite: [null, [Validators.required]],
      disponibilite: [null, [Validators.required]],
      nom: [null, [Validators.required]],
      selectedBlocId: [null, [Validators.required]]
    })
    this.getBlocs();
    this.getSalleById();
  }

  getBlocs(): void {
    this.blocService.afficherBloc().subscribe((res)=>{
      this.blocs = res;
    })
  }

  getSalleById(){
    this.salleService.afficherSalleById(this.id).subscribe((res)=>{
      console.log(res);
      this.updateSalleForm.controls["selectedBlocId"].patchValue(res.bloc.id);
      this.updateSalleForm.patchValue(res);
    })
  }

  updateSalle(){
    this.salleService.updateSalle(this.id,this.updateSalleForm.controls["selectedBlocId"].value,this.updateSalleForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id != null){
        this.router.navigateByUrl("/dashboard/afficherSalle");
      }
    })
  }

}
