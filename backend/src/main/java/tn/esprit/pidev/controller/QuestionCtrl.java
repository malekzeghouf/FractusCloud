package tn.esprit.pidev.controller;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pidev.entities.Projet;
import tn.esprit.pidev.entities.Question;
import tn.esprit.pidev.repository.QuestionRepo;
import tn.esprit.pidev.services.QusetionService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/questions")
@CrossOrigin("*")
public class QuestionCtrl {
    @Autowired
    private QuestionRepo questionRepo;

    QusetionService qusetionService;

    @PostMapping("/add")
    public Question addQuestion(@RequestBody Question question) {
        return questionRepo.save(question);
    }

    @GetMapping("/allqes")
    public List<Question> getAllQuestions() {
        return questionRepo.findAll();
    }


   /* @PutMapping("/update/{idquestion}")
    public Question updateQ(@PathVariable("idquestion") Long id, @RequestBody Question qu){
        Question q = questionRepo.findById(id).get();
        if(q!=null){
            q.setResultat(qu.getResultat());

            return questionRepo.save(q);
        }
        return  null;
    }*/
 /*   @PutMapping("/updatee/{idquestion}")
    public ResponseEntity<Question> updateQuestion(@PathVariable("idquestion") Long id, @RequestBody Question updatedQuestion) {
        return questionRepo.findById(id)
                .map(question -> {
                    System.out.println("Received result: " + updatedQuestion.getResultat()); // Ajouter ce log pour vérifier
                    question.setResultat(updatedQuestion.getResultat());
                    Question savedQuestion = questionRepo.save(question);
                    return ResponseEntity.ok(savedQuestion);
                })
                .orElseGet(() -> {
                    System.out.println("Question not found with id: " + id); // Log pour absence de question
                    return ResponseEntity.notFound().build();
                });
    }*/






}
