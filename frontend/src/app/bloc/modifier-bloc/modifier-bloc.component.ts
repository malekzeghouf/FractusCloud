import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlocService } from '../bloc.service';

@Component({
  selector: 'app-modifier-bloc',
  templateUrl: './modifier-bloc.component.html',
  styleUrls: ['./modifier-bloc.component.css']
})
export class ModifierBlocComponent {
  id: number = this.activatedRoute.snapshot.params["id"];

  updateBlocForm!: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private blocService: BlocService,
    private fb: FormBuilder,
    private router: Router){}

  ngOnInit(){
    this.updateBlocForm = this.fb.group({
      id: this.id,
      statut: [null, [Validators.required]],
      titre: [null, [Validators.required]]
    })
    this.getBlocById();
  }

  getBlocById(){
    this.blocService.afficherBlocById(this.id).subscribe((res)=>{
      console.log(res);
      this.updateBlocForm.patchValue(res);
    })
  }

  updateBloc(){
    this.blocService.updateBloc(this.id,this.updateBlocForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id != null){
        this.router.navigateByUrl("/dashboard/afficherBloc");
      }
    })
  }
}
