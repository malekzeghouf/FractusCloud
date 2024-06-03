import { Component } from '@angular/core';
import { FrontService } from '../front.service';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.css']
})
export class ParticipationComponent {


 
  donnees: any;

  constructor(private front: FrontService) {}


  ngOnInit(): void {
    this.getAllparticipation();
  }

  

 
  acceptParticipation(participationId:number)
  { this.front.acceptParticipation(participationId).subscribe(
    (res) => {
      console.log("Participation accepted successfully:", res);
      this.getAllparticipation();
    },
    (error) => {
      console.error("Error accepting participation:", error);
    }
  );

  }

 
  refuseParticipation(participationId:number){
    this.front.refuseParticipation(participationId).subscribe(
      (res) => {
        console.log("Participation refused successfully:", res);
        this.getAllparticipation();
      },
      (error) => {
        console.error("Error refusing participation:", error);
      }
    );
    
  }


  getAllparticipation(){
    this.front.getAllParticipation().subscribe(data => {
      this.donnees = data; // Stocke les données récupérées dans la variable donneesDeLaBase
    
    console.log("dfdd : ", data);
    
    });

  }
 
}
