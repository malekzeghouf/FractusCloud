package tn.esprit.pidev.services;

import tn.esprit.pidev.entities.RendezVous;
import tn.esprit.pidev.entities.User;

import java.util.Date;
import java.util.List;

public interface RendezVousCrud  {
    public List<RendezVous> afficherRendezVous();
    public RendezVous afficherRendezVousById(Long idRdv);

    public void supprimerRendezVous(Long idRdv);
    public RendezVous modifierRendezVous(RendezVous r);
    public RendezVous AddRendezVousToUser(RendezVous rendezVous , User user);

}
