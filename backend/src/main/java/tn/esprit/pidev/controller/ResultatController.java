package tn.esprit.pidev.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pidev.entities.Quizz;
import tn.esprit.pidev.entities.Resultat;
import tn.esprit.pidev.entities.User;
import tn.esprit.pidev.repository.RepoQuizz;
import tn.esprit.pidev.repository.ResultatRepository;
import tn.esprit.pidev.services.EmailService;
import tn.esprit.pidev.services.QusetionService;
import tn.esprit.pidev.services.UserService;

@RestController
@RequestMapping("/api/v1/auth/resultat")
@AllArgsConstructor
@CrossOrigin("*")
public class ResultatController {
    @Autowired
    ResultatRepository resultatRepository;
    @Autowired
    private RepoQuizz repoQuizz;
    @Autowired
    QusetionService qusetionService;
    @Autowired
    EmailService serviceMail;
    UserService userService;
    @PostMapping("scores")
    public void saveScore(@RequestBody Resultat resultat) {
        resultatRepository.save(resultat);
    }


    @PostMapping("/addResultat/{idR}/{idQ}")
    public Resultat addResultatQuiz(@PathVariable("idR")long idR , @PathVariable("idQ") long idQ) {
        Quizz q = repoQuizz.findById(idQ).get();
        Resultat r = resultatRepository.findById(idR).get();
        r.setQuizz(q);
        resultatRepository.save(r);
        return r;

    }

    @PostMapping("/addResultats/{idQ}/{iduser}")
    public Resultat addResultatToQuiz( @RequestBody Resultat r,@PathVariable("idQ") Long idQ,@PathVariable("iduser") Long idUser) {
        Quizz q = repoQuizz.findById(idQ).get();
        User user = userService.getUserById(idUser);
        System.out.println(user.getEmail());
        if(r.getScore() >= qusetionService.Nombredeq(idQ)/2){

                serviceMail.sendEmail(user.getEmail(),
                        "this is subject",
                        "Affecté a ce projet ");
                System.out.println("mail sent of quiz"+user.getEmail());

        }
        r.setQuizz(q);
        resultatRepository.save(r);
        return r;

    }
}
