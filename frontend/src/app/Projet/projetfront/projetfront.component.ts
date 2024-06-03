import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { ServiceService } from '../service.service';
import {FrontService} from "../../frontCours/front.service";
import {UserService} from "../../User/user.service";

@Component({
  selector: 'app-projetfront',
  templateUrl: './projetfront.component.html',
  styleUrls: ['./projetfront.component.css']
})
export class ProjetfrontComponent {

  @ViewChild('popupModal') popupModal: any;
  @ViewChild('popupModalUpdate') popupModalUpdate: any;

  @ViewChild('popupModalQuiz') popupModalQuiz: any;

  validateForm !: FormGroup;

  quizId!: number;

  compteur: number = 0;
  donnees: any;
  validateFormupdate!: FormGroup;

  id: any = this.activatedRoute.snapshot.params['id']
  quiz = {

   title:''
  };


  question = {
    question: '',
    options: ['', '', ''],
    correctAnswer: 0
  };



  constructor(private fb: FormBuilder ,private frontprojet: ServiceService,private activatedRoute: ActivatedRoute,private http: HttpClient,

  private userser : UserService) {}

  ngOnInit(): void {




    this.validateForm = this.fb.group({
      description : [null,[Validators.required]],
      nombre : [null,[Validators.required]],
      nom : [null,[Validators.required]],

      specialite : [null,[Validators.required]]

    })
    this.test();


    this.validateFormupdate = this.fb.group({
      idprojet: this.id,
      nom: [null,[Validators.required]],
     description:[null,[Validators.required]],
    nombre:[null,[Validators.required]],
    specialite:[null,[Validators.required]],
    })

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
    this.frontprojet.getMyProjets(id).subscribe(data => {
      this.donnees = data; // Stocke les données récupérées dans la variable donneesDeLaBase

    });
  }

  update(){
    this.frontprojet.update(this.validateFormupdate.value,this.id).subscribe((res)=>{

  })}
  getbyId(id :number){
    this.frontprojet.getbyId(this.id).subscribe((res) => {
      console.log(res);
      this.validateFormupdate.patchValue(res);
    })
  }

  ouvrirPopup1(id:number): void {
    this.popupModalUpdate.nativeElement.style.display = 'block'; // Ouvre le popup
  }
  fermerPopup1(): void {
    this.popupModalUpdate.nativeElement.style.display = 'none'; // Ferme le popup
  }

  ouvrirPopupQuiz(projectId:number): void {
    this.popupModalQuiz.nativeElement.style.display = 'block'; // Ouvre le popup
    this.quizId = projectId;

    console.log('Ouvrir popup avec l\'ID du projet : ', projectId);
  }
  fermerPopupQuiz(): void {
    this.popupModalQuiz.nativeElement.style.display = 'none'; // Ferme le popup
  }

  ouvrirPopup(): void {
    this.popupModal.nativeElement.style.display = 'block'; // Ouvre le popup
  }

  fermerPopup(): void {
    this.popupModal.nativeElement.style.display = 'none'; // Ferme le popup
  }

  getAllprojet(){
    this.frontprojet.getAll().subscribe(data => {
      this.donnees = data; // Stocke les données récupérées dans la variable donneesDeLaBase
    });

  }

  postprojet() {
    this.frontprojet.postProjet(this.validateForm.value,this.id).subscribe(res =>{
      console.log(res);
      this.getAllprojet();
    })
  }

  deleteprojet(id: number) {
    this.frontprojet.delete(id).subscribe((res) => {
      console.log(res);
      this.getAllprojet();

    })
  }

 /* onSubmit() {
    this.http.post<any>('http://localhost:8088/api/questions/questions', this.question)
      .subscribe(data => {
        console.log(data);
        // Afficher un message de succès ou rediriger vers une autre page
      });
  }*/
  onSubmit() {
    const url = `http://localhost:8082/api/v1/auth/questions/addq/${this.quizId}`; // Construire l'URL avec l'ID du projet
    this.http.post<any>(url, this.question)
      .subscribe(
        (data) => {
          console.log('Question ajoutée au quiz avec succès : ', data);
          // Effectuez des actions supplémentaires après l'ajout de la question au quiz si nécessaire
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la question au quiz : ', error);
          // Gérez les erreurs ici, par exemple, affichez un message d'erreur à l'utilisateur
        }
      );
  }



  onSubmitQuiz(projectId: number) {
    const url = `http://localhost:8082/api/v1/auth/questions/addQuiz`; // URL pour créer un nouveau quiz
    this.http.post<any>(url, this.quiz)
      .subscribe(
        (data) => {
          console.log('Nouveau quiz créé avec succès : ', data);
          console.log('Affecter le quiz au projet avec l\'ID : ', projectId);
          // Vous pouvez effectuer d'autres actions si nécessaire, comme fermer le popup, mettre à jour l'affichage, etc.
        },
        (error) => {
          console.error('Erreur lors de la création du nouveau quiz : ', error);
          // Gérez les erreurs ici, par exemple, affichez un message d'erreur à l'utilisateur
        }
      );
  }



  assignerQuizAuProjet(idprojet: number, quiz: any) {
    this.http.post<any>(`http://localhost:8082/api/v1/auth/questions/assignQuizToProject/${idprojet}`, quiz)
      .subscribe(
        (response) => {
          console.log('Quiz assigné avec succès au projet : ', response);
          // Effectuez des actions supplémentaires après avoir assigné le quiz au projet si nécessaire
        },
        (error) => {
          console.error('Erreur lors de l\'assignation du quiz au projet : ', error);
          // Gérez les erreurs ici, par exemple, affichez un message d'erreur à l'utilisateur
        }
      );
}








}
