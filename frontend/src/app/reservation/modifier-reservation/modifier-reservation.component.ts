import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-modifier-reservation',
  templateUrl: './modifier-reservation.component.html',
  styleUrls: ['./modifier-reservation.component.css']
})
export class ModifierReservationComponent {
  id: number = this.activatedRoute.snapshot.params["id"];

  updateReservationForm!: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private reservationService: ReservationService,
    private fb: FormBuilder,
    private router: Router){}

  ngOnInit(){
    this.updateReservationForm = this.fb.group({
      id: this.id,
      date: [null, [Validators.required]],
      raison: [null, [Validators.required]],
      nbParticipant: [null, [Validators.required]]
    })
    this.getReservationById();
  }

  getReservationById(){
    this.reservationService.afficherReservationById(this.id).subscribe((res)=>{
      console.log(res);
      const formattedDate = res.date.split('T')[0];
      this.updateReservationForm.patchValue({
        date: formattedDate,
        raison: res.raison,
        nbParticipant: res.nbParticipant
      });
    })
  }

  updateReservation(){
    this.reservationService.updateReservation(this.id,this.updateReservationForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id != null){
        this.router.navigateByUrl("/dashboard/afficherReservation");
      }
    })
  }
}
