import { Component } from '@angular/core';
import { SalleService } from '../salle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-afficher-salle-front',
  templateUrl: './afficher-salle-front.component.html',
  styleUrls: ['./afficher-salle-front.component.css']
})
export class AfficherSalleFrontComponent {
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

}
