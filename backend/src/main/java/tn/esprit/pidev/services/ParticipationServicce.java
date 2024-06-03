package tn.esprit.pidev.services;


import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import tn.esprit.pidev.entities.Cours;
import tn.esprit.pidev.entities.Participation;
import tn.esprit.pidev.entities.User;
import tn.esprit.pidev.repository.CoursRepo;
import tn.esprit.pidev.repository.ParticipationRepo;
import tn.esprit.pidev.repository.UserRepository;


import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@NoArgsConstructor
@AllArgsConstructor
public class ParticipationServicce implements ParticipationImpl {

    @Autowired
    ParticipationRepo participationRepo;
    @Autowired
    UserRepository userRepo;

    @Autowired
    CoursRepo coursRepo;

    @Transactional
    public Participation affecterUtilisateurAProjet(User utilisateur, Cours cours) {
        Participation participation = new Participation();
        participation.setUser(utilisateur);
        participation.setCour(cours);

        return participationRepo.save(participation);
    }


    public Participation acceptParticipation(Long participationId) {
        Participation participation = participationRepo.findById(participationId).orElseThrow(() -> new RuntimeException(" trouvé"));
            Cours c = participation.getCour();
         if(c.getNb_participant()< c.getNb_participant_max() ){
             c.setNb_participant(c.getNb_participant()+1);
             coursRepo.save(c);

             participation.setStatus("Accepter");
             participation.setNb_participant(participation.getNb_participant()+1);
             return participationRepo.save(participation);
         } else {
             throw new IllegalArgumentException("Le cours spécifiée n'existe pas.");
         }
    }

    // Méthode pour refuser une participation
    public Participation refuseParticipation(Long participationId) {
        Participation participation = participationRepo.findById(participationId)
        .orElseThrow(() -> new RuntimeException("non trouvé"));
        participation.setStatus("Refuser");
        return participationRepo.save(participation);
    }



    @Override
    public Participation coutParticipation(Long idCours , String body, User user ) {
        Cours cour = coursRepo.findById(idCours).orElse(null);
        // Vérifier si le cour existe
        if (cour != null) {
           // int nombreParticipations = participationRepo.countByCour(cour);
            int nombreParticipations = cour.getNb_participant();

            if (nombreParticipations < cour.getNb_participant_max()) {
                // Créer une nouvelle participation
                Participation participation = new Participation();
               // User user = userRepo.findById(idUser).get();
                 participation.setUser(user);
                System.out.println("particapation ajoutee");


                // Remplir les attributs titre et description avec les valeurs de cour
                participation.setCategoriePar(cour.getCategorie());

                // Définir le cour associée à la participation
                participation.setCour(cour);

                // Définir le statut de la participation
                participation.setStatus("EnAttente");

                // Enregistrer la participation dans la base de données
                return participationRepo.save(participation);

            } else {
                // Si le nombre maximal de participations est atteint, renvoyer une erreur
                throw new IllegalArgumentException("Le nombre maximal de participations est déjà atteint pour ce cours.");
            }
        } else {
            throw new IllegalArgumentException("Le cours spécifiée n'existe pas.");
        }

    }

    @Override
    public Map<String, Long> calculerStatistiquesParticipationsParCours() {
        List<Object[]> résultats = participationRepo.countParticipationsByCour();
        Map<String, Long> statistiques = new HashMap<>();

        for (Object[] résultat : résultats) {
            String titreEvenement = (String) résultat[0];
            Long nombreParticipations = (Long) résultat[1];
            statistiques.put(titreEvenement, nombreParticipations);
        }

        return statistiques;
    }

    public List<Participation> getAll(){
        return participationRepo.findAll();
    }



    }






