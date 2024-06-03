package tn.esprit.pidev.controller;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pidev.entities.Projet;
import tn.esprit.pidev.entities.Question;
import tn.esprit.pidev.entities.Quizz;
import tn.esprit.pidev.entities.Resultat;
import tn.esprit.pidev.repository.ProjetRepo;
import tn.esprit.pidev.repository.QuestionRepo;
import tn.esprit.pidev.repository.RepoQuizz;
import tn.esprit.pidev.repository.ResultatRepository;


import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auth/questions")
@AllArgsConstructor
@NoArgsConstructor
@CrossOrigin("*")
public class ControllerQuizz {

    @Autowired
    private RepoQuizz repoQuizz;
    ResultatRepository resultatRepository;
    @Autowired
    ProjetRepo projetRepo;
@Autowired
    QuestionRepo questionRepo;

    @PostMapping("/questions")
    public Question addQuestion(@RequestBody Question question) {
        return questionRepo.save(question);
    }


    @PostMapping("/addQuiz")
    public  Quizz addQuiz(@RequestBody Quizz quizz){
        return repoQuizz.save(quizz);
    }

    @GetMapping("/questions")
    public List<Question> getQuestions() {
        return questionRepo.findAll();
    }

    @PostMapping("/questions/evaluate")
    public int evaluateAnswers(@RequestBody List<Question> questions) {
        int correctAnswers = 0;
        for (Question question : questions) {
            if (question.getCorrectAnswer() == question.getSelectedAnswer()) {
                correctAnswers++;
            }
        }

        // Enregistrez le score dans la table des résultats
        Resultat result = new Resultat();
        result.setScore(correctAnswers);
        resultatRepository.save(result);

        return correctAnswers;
    }

    @PostMapping("/addq/{idQ}")
    public  Question addQuestionToQuiz(@RequestBody Question question , @PathVariable("idQ") long idQ){
        Quizz q = repoQuizz.findById(idQ).get();
        Question ques = new Question();
        ques.setQuiz(q);
        ques.setOptions(question.getOptions());
        ques.setCorrectAnswer(question.getCorrectAnswer());
        ques.setQuestion(question.getQuestion());

        questionRepo.save(ques);
        return ques;



    }
    @GetMapping("/questions/{idQ}")
    public List<Question> getQuestions(@PathVariable("idQ") long idquizz ) {
        Quizz q= repoQuizz.findById(idquizz).get();
        List<Question> listq = new ArrayList<>();
        for(Question question : q.getQuestions()){
            listq=q.getQuestions();

        }
        return listq;
    }
    /* @PostMapping("/affecterquizzaprojet/{idP}")
     public void assignQuiztoProject(@PathVariable("idP") long idpr,@RequestBody Quizz quizz){
         Projet pr= projetRepo.findById(idpr).get();
         quizz = repoQuizz.save(quizz);
         pr.setQuizz(quizz);
         projetRepo.save(pr);
     }*/
    @PostMapping("/assignQuizToProject/{projectId}")
    public ResponseEntity<String> assignQuizToProject(@PathVariable("projectId") long projectId, @RequestBody Quizz quiz) {
        Projet projet = projetRepo.findById(projectId).orElse(null);
        if (projet == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
        }

        // Enregistrer le quiz dans la base de données s'il n'existe pas déjà
        if (quiz.getIdQ() == null) {
            quiz = repoQuizz.save(quiz);
        }

        // Associer le quiz au projet
        projet.setQuizz(quiz);
        projetRepo.save(projet);

        return ResponseEntity.ok("Quiz assigned to project with ID: " + projectId);
    }





    @GetMapping("/getquizzbyprojetthenQuestion/{idp}")
    public List<Question> getQuizzQuestionsByProject(@PathVariable("idp") long projectId) {
        // Récupérer le projet par son ID
        Projet projet = projetRepo.findById(projectId).orElse(null);

        if (projet != null) {
            // Récupérer le quiz associé au projet
            Quizz quiz = projet.getQuizz();

            if (quiz != null) {
                // Retourner les questions du quiz
                return new ArrayList<>(quiz.getQuestions());
            }
        }

        // Retourner une liste vide si le projet ou le quiz n'existe pas
        return new ArrayList<>();
    }

    @PostMapping("/assignQuestionsToProjectQuiz/{projectId}")
    public ResponseEntity<?> assignQuestionsToProjectQuiz(@PathVariable("projectId") Long projectId, @RequestBody List<Question> questions) {
        try {
            // Trouvez le projet correspondant à l'ID donné
            Projet projet = projetRepo.findById(projectId).orElse(null);
            if (projet == null) {
                return ResponseEntity.notFound().build(); // Projet non trouvé
            }

            // Vérifiez si le projet a déjà un quiz associé
            Quizz quiz = projet.getQuizz();
            if (quiz == null) {
                // Si le projet n'a pas de quiz, créez un nouveau quiz
                quiz = new Quizz();
                projet.setQuizz(quiz);
            }

            // Ajoutez les questions au quiz
            quiz.getQuestions().addAll(questions);

            // Enregistrez le projet (qui mettra également à jour le quiz si nécessaire)
            projetRepo.save(projet);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Une erreur s'est produite lors de l'ajout des questions au quiz du projet : " + e.getMessage());
        }
    }


    @GetMapping("/nbrq/{idquizz}")
    public int Nombredeq (@PathVariable("idquizz") long idquizz){
        Quizz quizz = repoQuizz.findById(idquizz).get();
        return quizz.getQuestions().size();

    }

}