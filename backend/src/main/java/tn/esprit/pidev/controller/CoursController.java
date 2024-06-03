package tn.esprit.pidev.controller;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import tn.esprit.pidev.entities.Cours;
import tn.esprit.pidev.entities.User;
import tn.esprit.pidev.repository.CoursRepo;
import tn.esprit.pidev.services.CoursImpt;
import tn.esprit.pidev.services.ParticipationServicce;
import tn.esprit.pidev.services.UserService;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@NoArgsConstructor
@RestController
@RequestMapping("/api/v1/auth/cours")
@CrossOrigin("*")

public class CoursController {
    @Autowired
    CoursImpt coursImpt;
    @Autowired
    UserService userImpl;
    @Autowired
    CoursRepo   currRepo;

    @Autowired
    ParticipationServicce participationService;


    @PostMapping("/addC")
    public Cours addCour(@RequestBody Cours c){
        return coursImpt.addCours(c);
    }

    @PutMapping("/updateC")
    public Cours updateC(@RequestBody Cours cours){
        return coursImpt.updateCours(cours);
    }

    @GetMapping("/getall")
    public List<Cours>getallC(){
        return coursImpt.getAll();
    }

    @GetMapping("/getById/{idC}")
    public Cours getByIdC(@PathVariable("idC") Long idcour){
        return  coursImpt.getById(idcour);
    }

    @DeleteMapping("/deleteC/{idCo}")
    public void delete (@PathVariable("idCo") long idcour){
        coursImpt.deleteCours(idcour);
    }

    @PutMapping("/update/{id}")
    public Cours updateSalle(@PathVariable Long id,@RequestBody Cours c){
        Cours existingCour = coursImpt.getById(id);
        Cours updatedcour = null;

        if(existingCour != null){

            existingCour.setDate(c.getDate());
            existingCour.setDescription(c.getDescription());
            existingCour.setCategorie(c.getCategorie());
            existingCour.setPrix(c.getPrix());
            existingCour.setDuree(c.getDuree());
            existingCour.setNb_participant(c.getNb_participant());
           

            updatedcour = coursImpt.updateCours(c);
        }
        return updatedcour;
    }


    @PostMapping("/ajouterOffer/{id}")
    public ResponseEntity<?> AddOfferToUser(@RequestBody Cours cours,@PathVariable("id")long id  ) {
        User user = userImpl.getUserById(id);
        cours.setTuteur(user);
        currRepo.save(cours);
        return ResponseEntity.ok("Cours ajoutée avec succès");
        //return offerService.AddOfferToUser(offer, user);


}
    @PutMapping("/{id}/incrementer")
    public void incrementerNbParticipant(@PathVariable long id) {
        coursImpt.incrementerNbParticipant(id);
    }

    @GetMapping("/OtherCours/{userId}")
    public List<Cours> getListOther(@PathVariable("userId") Long idUser){
        List<Cours> result = new ArrayList<>();
        User user = userImpl.getUserById(idUser);
        List<Cours>  list =coursImpt.getAll();
        for(Cours c :list){
            if(c.getTuteur().getId()!=user.getId()){
                result.add(c);
            }
        }
        return  result;
    }
    @GetMapping("/MyCours/{userId}")
    public List<Cours> getMyList(@PathVariable("userId") Long idUser){
        List<Cours> result = new ArrayList<>();
        User user = userImpl.getUserById(idUser);
        List<Cours>  list =coursImpt.getAll();
        for(Cours c :list){
            if(c.getTuteur().getId()==user.getId()){
                result.add(c);
            }
        }
        return  result;
    }
}
