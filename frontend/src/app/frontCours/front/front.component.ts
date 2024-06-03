import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FrontService} from 'src/app/frontCours/front.service';
import {UserService} from "../../User/user.service";

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent {
  @ViewChild('popupModal') popupModal: any;
  @ViewChild('popupModalupdate') popupModalupdate: any;
  validateForm !: FormGroup;


  compteur: number = 0;
  donnees: any;
  validateFormUpdate!: FormGroup;
  id: any = this.activatedRoute.snapshot.params['id']

  constructor(private frontcours: FrontService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private frontt: FrontService ,
    private userser : UserService
  ) { }

    ngOnInit() {
      this.validateFormUpdate = this.fb.group({
       idCours : this.id,
       date: [null, [Validators.required]],
       description: [null, [Validators.required]],
       categorie : [null, [Validators.required]],
       duree :  [null, [Validators.required]],
       prix : [null, [Validators.required]],

       nb_participant_max: [null, [Validators.required]]
      })
      this.getCoursById(this.id);






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
      this.getMycours(res.id);

    });
  }

  getMycours(id:number) {
    this.frontt.getMyCours(id).subscribe(data => {
      this.donnees = data; // Stocke les données récupérées dans la variable donneesDeLaBase

    });
  }


  updatecour() {
    console.log("ID du cours à modifier :", this.id); // Vérifiez l'ID dans la console
    this.frontcours.updateCours(this.id, this.validateFormUpdate.value).subscribe((res) => {
      console.log(res);
      // Mettre à jour les données affichées après la modification du cours
      this.getAllcours();
    });
  }









  ouvrirPopup(): void {
    this.popupModal.nativeElement.style.display = 'block'; // Ouvre le popup
  }

  fermerPopup(): void {
    this.popupModal.nativeElement.style.display = 'none'; // Ferme le popup
  }

  ouvrirPopup1(id: any): void {
    this.id = id;
    this.popupModalupdate.nativeElement.style.display = 'block'; // Ouvre le popup
    this.getCoursById(id); // Appel pour charger les données du cours à mettre à jour
  }

  getCoursById(id: any) {
    this.frontcours.getCourById(id).subscribe((res) => {
      console.log(res);
      this.validateFormUpdate.patchValue(res);
    })
  }


  fermerPopup1(): void {
    this.popupModalupdate.nativeElement.style.display = 'none'; // Ferme le popup
  }


  getAllcours(){
    this.frontcours.getAllcour().subscribe(data => {
      this.donnees = data; // Stocke les données récupérées dans la variable donneesDeLaBase
    });

  }

  postCour() {
    this.frontcours.postCour(this.validateForm.value,this.id).subscribe(res =>{
      console.log(res);
      this.getAllcours();
    })
  }

  deleteCours(id: number) {
    this.frontcours.deleteCour(id).subscribe((res) => {
      console.log(res);
      this.getAllcours();

    })
  }


}
