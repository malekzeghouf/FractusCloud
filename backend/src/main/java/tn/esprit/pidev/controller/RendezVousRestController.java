package tn.esprit.pidev.controller;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pidev.DTO.RatingDto;
import tn.esprit.pidev.entities.Rating;
import tn.esprit.pidev.entities.RendezVous;
import tn.esprit.pidev.entities.User;
import tn.esprit.pidev.repository.RendezVousRepository;
import tn.esprit.pidev.services.SendMail;
import tn.esprit.pidev.services.ServiceRating;
import tn.esprit.pidev.services.ServiceRendezVous;
import tn.esprit.pidev.services.UserService;

import java.util.Date;
import java.util.List;



@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/auth")
@CrossOrigin("*")
public class RendezVousRestController {
    ServiceRating sr;
    ServiceRendezVous serviceRendezVous ;
    UserService serviceUser ;
    RendezVousRepository rendezVousRepository;
    ServiceRating serviceRating;

    @GetMapping("/rendezVous/all")
    public List<RendezVous> getRendezVous(){
        List<RendezVous>  listRendezVous = serviceRendezVous.afficherRendezVous();
        return listRendezVous;

    }
    @GetMapping("/rendezVous/show/{id}")
    public RendezVous showRendezVous(@PathVariable("id") Long RendezVousId ){

        RendezVous rendezVous = serviceRendezVous.afficherRendezVousById(RendezVousId);
        return rendezVous ;

    }
    @PostMapping("/rendezVous/ajout/{idUser}")
    public RendezVous addrendezVous (@PathVariable("idUser") Long userId ,@RequestBody RendezVous r){
        User u = serviceUser.getUserById(userId);
        RendezVous rendezVous = serviceRendezVous.AddRendezVousToUser(r,u);
        sr.sendRatingMails();
        //serviceRendezVous.send_SMS();

        return rendezVous ;
    }

    @DeleteMapping ("/rendezVous/delete/{id}")
    public void deleterendezVous (@PathVariable("id") Long RendezVousId){
        serviceRating.deleteRatingByRdv(serviceRendezVous.afficherRendezVousById(RendezVousId));
        serviceRendezVous.supprimerRendezVous(RendezVousId);
    }

    @PutMapping("/rendezVous/update/{id}")
    public RendezVous updaterendezVous (@PathVariable Long id,@RequestBody RendezVous r ){
        RendezVous rdvExisting = serviceRendezVous.afficherRendezVousById(id);
        RendezVous rendezVous = null;
        if(rdvExisting != null){
            rdvExisting.setDateRdv(r.getDateRdv());
            rdvExisting.setDescription(r.getDescription());
            rdvExisting.setTitre(r.getTitre());
            rdvExisting.setContact(r.getContact());
            rdvExisting.setHeure(r.getHeure());
            rdvExisting.setRemarques(r.getRemarques());
            rdvExisting.setStatus(r.getStatus());
        }
        rendezVous = serviceRendezVous.modifierRendezVous(r);
        return rendezVous;
    }
    @PostMapping("/rendezVous/addrating")
    public ResponseEntity addRating(@RequestBody RatingDto ratingDto){
        Rating rating = new Rating();
        rating.setReview(ratingDto.review());
        rating.setScore(ratingDto.score());
        rating.setRdv(serviceRendezVous.afficherRendezVousById(ratingDto.idRdv()));
        serviceRating.addRating(rating);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/rendezVous/getrating/{idrdv}")
    public Rating getRating(@PathVariable Long idrdv){
        return serviceRating.getRatingByRdvId(idrdv);
    }
}
