import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RendezVousService } from '../rendez-vous.service';

@Component({
  selector: 'app-avis-form',
  templateUrl: './avis-form.component.html',
  styleUrls: ['./avis-form.component.css']
})
export class AvisFormComponent {
  rdv_id!:number;
  rating!: number;
  description!: string;
  constructor(private route: ActivatedRoute, private rs : RendezVousService,private router : Router){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.rdv_id = params['rdv'];
    });
  }

  onStarClick(index: number): void {
    this.rating = index + 1;
    const stars = document.querySelectorAll('.rating .star');
    stars.forEach((star, idx) => {
      if (idx <= index) {
        star.classList.replace('bx-star', 'bxs-star');
        star.classList.add('active');
      } else {
        star.classList.replace('bxs-star', 'bx-star');
        star.classList.remove('active');
      }
    });
  }

  onSubmit(): void {
    console.log('Rating:', this.rating);
    console.log('Description:', this.description);

    const body = {score: this.rating,review: this.description, idRdv: this.rdv_id}
    this.rs.ajouterRating(body).subscribe(res => console.log(res)); 
    this.router.navigate(['/']);
  }

}
