package tn.esprit.pidev.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import tn.esprit.pidev.entities.Participation;
import tn.esprit.pidev.entities.User;
import tn.esprit.pidev.services.CoursService;
import tn.esprit.pidev.services.ParticipationImpl;
import tn.esprit.pidev.services.ParticipationServicce;
import tn.esprit.pidev.services.UserService;



import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/auth/user")
@CrossOrigin("*")
public class ControllerParticipation {

    @Autowired
    ParticipationServicce participationService;
    @Autowired
    ParticipationImpl participationImp;
    CoursService coursService;
    UserService userImpl;

    /*@PostMapping("/affectation/{idC}/{idU}")
    public Participation affecterUtilisateurAProjet(@PathVariable("idC") Long idCours,@PathVariable("idU") Long id) {
        // Ici, vous obtiendrez l'utilisateur et le projet à partir de la demande ou de toute autre source
        User utilisateur = userService.getUserById(id);
       // Cours  = coursService.getById(idCours);



        return participationService.affecterUtilisateurAProjet(utilisateur, cours);
    }*/

    @PutMapping("/{participationId}/accept")
    public ResponseEntity<Participation> acceptParticipation(@PathVariable Long participationId) {
        Participation participation = participationService.acceptParticipation(participationId);
        return ResponseEntity.ok(participation);
    }

    // Endpoint pour refuser une participation
    @PutMapping("/{participationId}/refuse")
    public ResponseEntity<Participation> refuseParticipation(@PathVariable Long participationId) {
        Participation participation = participationService.refuseParticipation(participationId);
        return ResponseEntity.ok(participation);
    }



    @GetMapping("/p/getall")
    public List<Participation> getallC(){
        return participationService.getAll();
    }

  /*  @GetMapping("/p/getById/{idC}")
    public Participation getByIdC(@PathVariable("idP") Long idP){

        return participationService.getById(idP);
    }*/


    @PostMapping("/add/{id}/{idUser}")
    public Participation coutParticipation(@PathVariable("id") Long idCours , String body , @PathVariable("idUser") long iduser) {
        User user = userImpl.getUserById(iduser);
        return participationService.coutParticipation(idCours, body , user);
    }

    @GetMapping("/stat")
    public Map<String, Long> calculerStatistiquesParticipationsParCours() {
        return participationService.calculerStatistiquesParticipationsParCours();
    }

}

