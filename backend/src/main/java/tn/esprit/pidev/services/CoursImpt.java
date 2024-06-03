package tn.esprit.pidev.services;



import tn.esprit.pidev.entities.Cours;
import tn.esprit.pidev.entities.User;

import java.util.List;

public interface CoursImpt {
    public Cours addCours(Cours c);
    public Cours updateCours(Cours cour);
    public List<Cours>getAll();
    public Cours getById(Long idCours);
    public void deleteCours(Long idCours);
    public Cours AddCoursToUser(Cours offer, User user);
    public void incrementerNbParticipant(long idCours);
}
