package tn.esprit.pidev.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pidev.entities.Quizz;
import tn.esprit.pidev.entities.Resultat;
import tn.esprit.pidev.repository.RepoQuizz;
import tn.esprit.pidev.repository.ResultatRepository;
@RestController
@RequestMapping("/resultat")
@AllArgsConstructor
@CrossOrigin("*")
public class ResultatController {
    @Autowired
    ResultatRepository resultatRepository;
    @Autowired
    private RepoQuizz repoQuizz;
    @PostMapping("scores")
    public void saveScore(@RequestBody Resultat resultat) {
        resultatRepository.save(resultat);
    }


    @PostMapping("/addResultat/{idR}/{idQ}")
    public Resultat addResultatToQuiz(@PathVariable("idR")long idR , @PathVariable("idQ") long idQ) {
        Quizz q = repoQuizz.findById(idQ).get();
        Resultat r = resultatRepository.findById(idR).get();
        r.setQuizz(q);
        resultatRepository.save(r);
        return r;

    }
}
