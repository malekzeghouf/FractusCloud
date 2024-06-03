package tn.esprit.pidev.services;

import tn.esprit.pidev.entities.Bloc;
import tn.esprit.pidev.entities.Salle;

import java.util.List;

public interface SalleCrud {
    public List<Salle> afficherSalle();
    public Salle afficherSalleById(Long idSalle);
    public Salle ajouterSalle(Salle s);
    public void supprimerSalle(Long idSalle);
    public Salle modifierSalle(Salle s);
}
