package tn.esprit.pidev.controller;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pidev.entities.AffectationRequest;
import tn.esprit.pidev.entities.Collaboration;
import tn.esprit.pidev.entities.Projet;
import tn.esprit.pidev.entities.User;
import tn.esprit.pidev.repository.CollaborationRepo;
import tn.esprit.pidev.services.CollaborationService;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/collab")

public class ControllerCollaboration {
    CollaborationService collaborationService;
    CollaborationRepo collaborationRepo;
    @PostMapping("/affectation")
    public Collaboration affecterUtilisateurAProjet(@RequestBody AffectationRequest request) {
        // Ici, vous obtiendrez l'utilisateur et le projet à partir de la demande ou de toute autre source
        User utilisateur = request.getUtilisateur();
       Projet projet = request.getProjet();
        return collaborationService.AffecterCollab(utilisateur, projet);
    }
    @PutMapping("/{participationId}/accept")
    public ResponseEntity<Collaboration> acceptParticipation(@PathVariable Long participationId) {
        Collaboration participation = collaborationService.acceptParticipation(participationId);
        return ResponseEntity.ok(participation);
    }

    // Endpoint pour refuser une participation
    @PutMapping("/{participationId}/refuse")
    public ResponseEntity<Collaboration> refuseParticipation(@PathVariable Long participationId) {
        Collaboration participation = collaborationService.refuseParticipation(participationId);
        return ResponseEntity.ok(participation);
    }

    @GetMapping("/liste des participations")
    public List<Collaboration> listedespartici(){
        return collaborationRepo.findAll();
    }
}
