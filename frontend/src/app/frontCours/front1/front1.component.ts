import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FrontService } from '../front.service';
import {UserService} from "../../User/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-front1',
  templateUrl: './front1.component.html',
  styleUrls: ['./front1.component.css']
})
export class Front1Component {

  @ViewChild('popupModal') popupModal: any;
  validateForm !: FormGroup;
  donnees: any;
  id!:number;

  constructor(private frontt: FrontService,  private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,private userser : UserService) {}


  ngOnInit() {
    this.validateForm = this.fb.group({
      date: [null, [Validators.required]],
      description: [null, [Validators.required]],
      categorie: [null, [Validators.required]],
      duree: [null, [Validators.required]],
      prix: [null, [Validators.required]],

      nb_participant_max: [null, [Validators.required, Validators.max(20)]]
    })
    this.test()

  }

  test(): void{
    this.userser .getUserByToken().subscribe(res =>{console.log(res)
      this.id=res.id;
      console.log(this.id)
      console.log(res.id)
      this.getAllcours(res.id);

    });
  }

  getAllcours(id:number){
    this.frontt.getOtherCours(id).subscribe(data => {
      this.donnees = data; // Stocke les données récupérées dans la variable donneesDeLaBase

    });

  }
 /* incrementerNbParticipant(cour: any) {
    if (cour.nb_participant < cour.nb_participant_max) {
      const nouveauNbParticipant= cour.nb_participant++;

      this.frontt.updateCours(cour.id, { nb_participant: cour.nb_participant }).subscribe(() => {

      });
    }
  }*/




  ouvrirPopup(): void {
    this.popupModal.nativeElement.style.display = 'block'; // Ouvre le popup
  }

  fermerPopup(): void {
    this.popupModal.nativeElement.style.display = 'none'; // Ferme le popup
  }

  postCour() {
    this.frontt.postCour(this.validateForm.value,this.id).subscribe(res =>{
      console.log(res);
      //this.getAllcours();
    })
  }

  incr(cour :any) {

    this.frontt.Incriment(cour.idCours,this.id).subscribe(res =>{
      console.log(res);
      //this.getAllcours();
    })
  }





}
