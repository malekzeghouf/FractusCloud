import { Component } from '@angular/core';
import { SalleService } from '../salle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-afficherSalle',
  templateUrl: './afficher-salle.component.html',
  styleUrls: ['./afficher-salle.component.css']
})
export class AfficherSalleComponent {

  salles: any = [];

  constructor(
    private salleService: SalleService,
    private router: Router){}

  ngOnInit(){
    this.getAllSalle();
  }

  getAllSalle(){
    this.salleService.afficherSalle().subscribe((res)=>{
      console.log(res);
      this.salles = res;
    })
  }

  deleteSalle(id: number){
    this.salleService.supprimerSalle(id).subscribe((res)=>{
      console.log(res);
      this.ngOnInit();
    })
  }

}
