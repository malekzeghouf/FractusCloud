package tn.esprit.pidev.services;


import tn.esprit.pidev.entities.RendezVous;
import java.util.List;

public interface RendezVousCrud {
    public List<RendezVous> afficherRendezVous();
    public RendezVous afficherRendezVousById(Long idRdv);
    public RendezVous ajouterRendezVous(RendezVous r);
    public void supprimerRendezVous(Long idRdv);
    public RendezVous modifierRendezVous(RendezVous r);
}
