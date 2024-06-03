import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlocService } from '../bloc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-bloc',
  templateUrl: './ajouter-bloc.component.html',
  styleUrls: ['./ajouter-bloc.component.css']
})
export class AjouterBlocComponent {
  postBlocForm!: FormGroup;

  constructor(
    private blocService: BlocService,
    private fb: FormBuilder,
    private router: Router){}

  ngOnInit(){
    this.postBlocForm = this.fb.group({
      statut: [null, [Validators.required]],
      titre: [null, [Validators.required]]
    })
  }

  postBloc(){
    console.log(this.postBlocForm.value);
    this.blocService.postBloc(this.postBlocForm.value).subscribe((res)=>{
      console.log(res);
      this.router.navigateByUrl("/dashboard/afficherBloc");
    })
  }
}
