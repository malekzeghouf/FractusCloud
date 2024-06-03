import { Component, ComponentFactoryResolver, ViewContainerRef  } from '@angular/core';
import { RendezVousService } from '../rendez-vous.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-afficher-rendez-vous',
  templateUrl: './afficher-rendez-vous.component.html',
  styleUrls: ['./afficher-rendez-vous.component.css']
})
export class AfficherRendezVousComponent {
    rdvs!: any[];
    score!:number;
    description!:string;

    constructor(
      private rdvService: RendezVousService,
      private router: Router,
      private rs : RendezVousService
    ){}

    ngOnInit(){
      this.getRdvs();
    }

    getRdvs(){
      this.rdvService.afficherRendezVous().subscribe((res) =>{
        console.log(res);
        this.rdvs = res;
      })
    }

    deleteRdv(id: number){
      this.rdvService.supprimerRendezVous(id).subscribe((res)=>{
        console.log(res);
        this.ngOnInit();
      })
    }

    async openRating(id: number){
      const parentDiv = document.querySelector('.review-container-div');
      if (parentDiv) {
        while (parentDiv.firstChild) {
            parentDiv.removeChild(parentDiv.firstChild);
        }
      }
      let isOkay = false;
      await this.rs.getRatingByRdv(id).then(response => {
          console.log(response);
          if(response){
            isOkay = true
            this.score = response.score;
            this.description = response.review;
          }else{
            isOkay = false
          }
        });
      if(isOkay){
        const scoreText ="Score: " + this.score;
        const descriptionText = "Description: " + this.description;
        const divElement = document.createElement('div');
        divElement.style.padding = '10px';
        divElement.style.border = '1px solid black';
        divElement.style.borderRadius = '5px';
        divElement.style.marginTop = '10px';
        divElement.style.width = '100%'
        divElement.style.marginBottom = '10px';
        const textNode = document.createTextNode(scoreText);
        const textNode2 = document.createTextNode(descriptionText);
        const lineBreak = document.createElement('br');
        divElement.appendChild(textNode);
        divElement.appendChild(lineBreak);
        divElement.appendChild(textNode2);

        if (parentDiv) {
          parentDiv.appendChild(divElement);
        }
      }else{
        const text ="Aucun avis a afficher";
        const textNode = document.createTextNode(text);
        const divElement = document.createElement('div');
        divElement.style.padding = '10px';
        divElement.style.border = '1px solid black';
        divElement.style.borderRadius = '5px';
        divElement.style.marginTop = '10px';
        divElement.style.width = '100%'
        divElement.style.marginBottom = '10px';
        divElement.appendChild(textNode);
        if (parentDiv) {
          parentDiv.appendChild(divElement);
        }
      }

    }
}
