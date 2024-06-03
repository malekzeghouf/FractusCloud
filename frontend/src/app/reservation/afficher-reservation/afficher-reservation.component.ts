import { Component } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-afficher-reservation',
  templateUrl: './afficher-reservation.component.html',
  styleUrls: ['./afficher-reservation.component.css']
})
export class AfficherReservationComponent {
  reservations: any = [];

  constructor(
    private reservationService: ReservationService,
    private router: Router){}

  ngOnInit(){
    this.getAllReservation();
  }

  getAllReservation(){
    this.reservationService.afficherReservation().subscribe((res)=>{
      console.log(res);
      this.reservations = res;
    })
  }

  deleteReservation(id: number){
    this.reservationService.supprimerReservation(id).subscribe((res)=>{
      console.log(res);
      this.ngOnInit();
    })
  }
}
