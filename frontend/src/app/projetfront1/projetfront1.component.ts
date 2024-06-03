import { Component, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../Projet/service.service';
import {UserService} from "../User/user.service";

@Component({
  selector: 'app-projetfront1',
  templateUrl: './projetfront1.component.html',
  styleUrls: ['./projetfront1.component.css']
})
export class Projetfront1Component {
  validateForm !: FormGroup;
  donnees: any;
  quizz: any;
  @ViewChild('popupModal') popupModal: any;
  questions: any[] = []; // Initialisez la variable questions
  selectedOptions: number[] = [];
  currentQuestionIndex = 0;
  quizCompleted = false;
  score!: number;
  id!: number;

  currentQuizId!: number; // Store the current quiz ID


  elapsedTime: number = 0;
  timerInterval: any ;
  timeLeft: number = 60;

  constructor(private frontprojet: ServiceService, private fb: FormBuilder, private http: HttpClient,
              private userser : UserService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      idQ: [null, [Validators.required]],
      title: [null, [Validators.required]],
    });

    this.test()
    this.getAllQuestions(); // Appelez la méthode pour récupérer les questions depuis le serveur

    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0 && !this.quizCompleted) {
        this.timeLeft--;
      } else {
        clearInterval(this.timerInterval);
        this.quizCompleted = true;
      }
    }, 1000);

  }

  test(): void{
    this.userser .getUserByToken().subscribe(res =>{console.log(res)
      this.id=res.id;
      console.log(this.id)
      console.log(res.id)
      this.getAllProjets(res.id);

    });
  }

  getAllProjets(id:number){
    this.frontprojet.getOtherProjets(id).subscribe(data => {
      this.donnees = data; // Stocke les données récupérées dans la variable donneesDeLaBase

    });

  }


  formatTime(time: number): string {
    const minutes: number = Math.floor(time / 60);
    const seconds: number = time % 60;
    const formattedMinutes: string = minutes.toString().padStart(2, '0');
    const formattedSeconds: string = seconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }



  getAllprojet() {
    this.frontprojet.getAll().subscribe(data => {
      this.donnees = data;
    });
  }

  getAllQuestions() {
    this.http.get<any[]>(`http://51.8.251.179:8082/api/v1/auth/questions/questions`)
  .subscribe(questions => {
      this.questions = questions; // Assurez-vous que les questions sont correctement assignées
      this.selectedOptions = new Array(this.questions.length).fill(null);
    });
  }

  ouvrirPopup(projectId: number): void {
    this.currentQuizId = projectId;
    this.startTimer();

    this.frontprojet.getQuestionsForProjectQuiz(projectId).subscribe(
      (questions: any[]) => {
        this.questions = questions;
        this.quizCompleted = false;
        this.currentQuestionIndex = 0;
        this.selectedOptions = new Array(this.questions.length).fill(null);
        this.popupModal.nativeElement.style.display = 'block';
        console.log(this.questions)
      },

      error => {
        console.error('Erreur lors de la récupération des questions:', error);
      }
    );
  }

  fermerPopup(): void {
    this.popupModal.nativeElement.style.display = 'none';

    this.stopTimer();
  }

  suivant() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.calculerScore();
      this.quizCompleted = true;
      this.onQuizCompleted(this.currentQuizId);
    }
  }

  calculerScore() {
    this.score = 0;
    for (let i = 0; i < this.questions.length; i++) {
      if (this.selectedOptions[i] === this.questions[i].correctAnswer-1) {
        this.score++;
        console.log(this.score);
      }
    }
  }

  onQuizCompleted(idQ:number) {
    this.calculerScore();
    console.log("id mtaa el user : "+this.id);
    this.http.post<any>(`http://51.8.251.179:8082/api/v1/auth/resultat/addResultats/${idQ}/${this.id}`, { score: this.score })
  .subscribe(() => {
      console.log(this.id)
      console.log('Score enregistré avec succès!');
    }, error => {
      console.error('Erreur lors de l\'enregistrement du score:', error);
    });
    this.stopTimer();
  }

  startTimer(): void {
    this.stopTimer(); // Stop any existing timer
    this.timerInterval = setInterval(() => {
      this.elapsedTime++;
      if (this.elapsedTime >= 60) { // Ensure quiz stops at 60 seconds
        this.stopTimer();
        this.quizCompleted = true;
        if (this.currentQuizId) {
          this.onQuizCompleted(this.currentQuizId);
        }
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }


  getQuestionsForProject(projectId: number) {
    this.frontprojet.getQuestionsForProjectQuiz(projectId).subscribe(
      (questions: any[]) => {
        this.questions = questions;
        this.quizCompleted = false; // Réinitialiser l'état du quiz
        this.currentQuestionIndex = 0; // Réinitialiser l'index de la question
        this.selectedOptions = new Array(this.questions.length).fill(null); // Réinitialiser les réponses sélectionnées
        this.ouvrirPopup(projectId); // Ouvrir le popup avec les questions récupérées
      },
      error => {
        console.error('Erreur lors de la récupération des questions:', error);
      }
    );
  }

  resetQuiz(): void {
    if (this.quizCompleted || this.questions.length === 0) {
      this.stopTimer();
      this.questions = [];
      this.selectedOptions = [];
      this.currentQuestionIndex = 0;
      this.quizCompleted = false;
    }
  }

}
