package tn.esprit.pidev.services;



import tn.esprit.pidev.entities.Cours;
import tn.esprit.pidev.entities.Participation;
import tn.esprit.pidev.entities.User;

import java.util.List;
import java.util.Map;

public interface ParticipationImpl {
    public Participation affecterUtilisateurAProjet(User utilisateur, Cours cours);
    public Participation acceptParticipation(Long participationId);
    public Participation refuseParticipation(Long participationId);




    Participation coutParticipation(Long idCours, String body ,User usr);
    Map<String, Long> calculerStatistiquesParticipationsParCours();


}
