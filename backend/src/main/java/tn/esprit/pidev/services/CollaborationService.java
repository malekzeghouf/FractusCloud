 package tn.esprit.pidev.services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.pidev.entities.Collaboration;
import tn.esprit.pidev.entities.Projet;
import tn.esprit.pidev.entities.User;
import tn.esprit.pidev.repository.CollaborationRepo;
import tn.esprit.pidev.repository.ProjetRepo;
import tn.esprit.pidev.repository.UserRepository;


 @Service
@AllArgsConstructor
public class CollaborationService implements ICollaborationService{
CollaborationRepo collaborationRepo;
UserRepository userRepo;
ProjetRepo projetRepo;


///** affectation du projet au user qui ajoute le projet
    @Transactional
    @Override
    public Collaboration AffecterCollab(User user, Projet projet) {
        Collaboration collaboration = new Collaboration();
        collaboration.setUser(user);
        collaboration.setProjet(projet);

       return collaborationRepo.save(collaboration);
    }
    public Collaboration acceptParticipation(Long participationId) {
        Collaboration participation = collaborationRepo.findById(participationId)


                .orElseThrow(() -> new RuntimeException(" trouvé"));
        participation.setStatus("Accepter");
        return collaborationRepo.save(participation);
    }

    // Méthode pour refuser une participation
    public Collaboration refuseParticipation(Long participationId) {
        Collaboration participation = collaborationRepo.findById(participationId)
                .orElseThrow(() -> new RuntimeException("non trouvé"));
        participation.setStatus("Refuser");
        return collaborationRepo.save(participation);
    }
/*

            public Collaboration affecterUserAunProjetetQuizz(long idUser, long idprojet, Collaboration c){
                User u = userRepo.findById(idUser).get();
                Projet p= projetRepo.findById(idprojet).get();
                p.getQs();
                c.setUser(u);
                c.setProjet(p);
         return collaborationRepo.save(c);   }*/












}
