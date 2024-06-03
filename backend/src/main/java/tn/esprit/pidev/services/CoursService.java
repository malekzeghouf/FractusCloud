package tn.esprit.pidev.services;
import jakarta.transaction.Transactional;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.pidev.entities.Cours;
import tn.esprit.pidev.entities.User;
import tn.esprit.pidev.repository.CoursRepo;


import java.util.List;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class CoursService implements CoursImpt{
    @Autowired
    CoursRepo coursRepo;
    @Override
    public Cours addCours(Cours c) {

        return coursRepo.save(c);
    }

    @Override
    public Cours updateCours(Cours cour) {
        return coursRepo.save(cour);
    }

    @Override
    public List<Cours> getAll() {
        return coursRepo.findAll();
    }

    @Override
    public Cours getById(Long idCours) {

        return coursRepo.findById(idCours).get();
    }

    @Override
    public void deleteCours(Long idCours) {
         coursRepo.deleteById(idCours);
    }

    @Override
    @Transactional
    public Cours AddCoursToUser(Cours offer, User user) {
        offer.setTuteur(user); // Affecter l'utilisateur à l'offre

        return coursRepo.save(offer);
    }


    public void incrementerNbParticipant(long idCours) {
        // Récupérer le cours par son ID
        Cours cours = coursRepo.findById(idCours).orElse(null);
        if (cours != null) {
            // Vérifier si le nombre de participants a atteint le nombre maximum de participants
            if (cours.getNb_participant() < cours.getNb_participant_max()) {
                // Incrémenter le nombre de participants
                cours.setNb_participant(cours.getNb_participant_max() + 1);
                // Enregistrer les modifications dans la base de données
                coursRepo.save(cours);
            }
        }
    }





}
