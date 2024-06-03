import { Component } from '@angular/core';
import { BlocService } from '../bloc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-afficher-bloc',
  templateUrl: './afficher-bloc.component.html',
  styleUrls: ['./afficher-bloc.component.css']
})
export class AfficherBlocComponent {
  
  blocs: any = [];

  constructor(
    private blocService: BlocService,
    private router: Router){}

  ngOnInit(){
    this.getAllBloc();
  }

  getAllBloc(){
    this.blocService.afficherBloc().subscribe((res)=>{
      console.log(res);
      this.blocs = res;
    })
  }

  deleteBloc(id: number){
    this.blocService.supprimerBloc(id).subscribe((res)=>{
      console.log(res);
      this.ngOnInit();
    })
  }

}
