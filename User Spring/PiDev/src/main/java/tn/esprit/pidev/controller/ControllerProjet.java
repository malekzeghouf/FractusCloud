package tn.esprit.pidev.controller;


import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pidev.entities.Projet;
import tn.esprit.pidev.entities.Question;
import tn.esprit.pidev.entities.User;
import tn.esprit.pidev.repository.ProjetRepo;
import tn.esprit.pidev.services.ProjetService;
import tn.esprit.pidev.services.UserService;

import java.security.Principal;
import java.util.Collection;
import java.util.List;
import java.util.Optional;


@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/auth/projet")
@CrossOrigin("*")



public class ControllerProjet {
    @Autowired
    UserService userImpl;
    @Autowired
ProjetService   projetService;
@Autowired
ProjetRepo projetRepo;



    @PostMapping("/addprojet")
 public Projet addprojet(@RequestBody Projet p ){
        return projetService.addprojet(p);}



    @PutMapping("/update/{Projet_id}")

 /***modifier***/
 public Projet updateprojet(@PathVariable("Projet_id") Long id,@RequestBody Projet p){
        Projet existingprojet = projetService.getbyid(id);
        Projet updateprojet=null;
        if(existingprojet!=null){
            existingprojet.setNom(p.getNom());
            existingprojet.setNombre(p.getNombre());
            existingprojet.setSpecialite(p.getSpecialite());
            existingprojet.setDescription(p.getDescription());
        updateprojet=projetService.update(p);}

    return updateprojet;
    }
    @GetMapping("/getall")
    public List<Projet> getall(){return projetService.getallprojet();}

    @GetMapping("/getProjet/{idProjet}")
    public Projet getbyId(@PathVariable("idProjet") long idprojet){return projetService.getbyid(idprojet);}

    @DeleteMapping("/delete/{idProjet}")
    public void deletePiste(@PathVariable("idProjet") long numP)
    {projetService.delete(numP);}

    @PostMapping("/ajouterOffer")
    public ResponseEntity<?> AddOfferToUser(@RequestBody Projet projet,  Authentication authentication) {

        authentication = SecurityContextHolder.getContext().getAuthentication();

        Optional<User> user = userImpl.getUser(authentication.getName());
        if (user == null) {
            return ResponseEntity.badRequest().body("Utilisateur non trouvé");
        }


        projetService.AddProjetToUser(projet, user.orElse(null)); // Ajouter l'offre en l'associant à l'utilisateur
        // Envoyer la notification à l'admin

        return ResponseEntity.ok("Projet ajoutée avec succès");
        //return offerService.AddOfferToUser(offer, user);


    }
/*
@PostMapping("/affecterQuizz/{idp}")*/
/*
    public void AffecterQuizzaunProjet(@PathVariable("idp") long idprojet,@RequestBody List<Question> quizz) {
        projetService.AffecterQuizzaunProjet(idprojet, quizz);
    }*/


/*
    @PutMapping("/updateee/{idquestion}")
    public ResponseEntity<Projet> updateQuestion(@PathVariable("idquestion") Long id, @RequestBody Projet  updatedQuestion) {
        System.out.println("Attempt to update question with ID: " + id + " with result: " + updatedQuestion.getResultat());
        return projetRepo.findById(id)
                .map(projet -> {
                    projet.setResultat(updatedQuestion.getResultat());
                    projetRepo.save(projet);
                    System.out.println("Updated question with ID: " + id + " to result: " + projet.getResultat());
                    return ResponseEntity.ok(projet);
                })
                .orElseGet(() -> {
                    System.out.println("Question not found with id: " + id);
                    return ResponseEntity.notFound().build();
                });
    }*/

}
