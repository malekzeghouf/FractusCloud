package tn.esprit.pidev.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.pidev.entities.RendezVous;
import tn.esprit.pidev.repository.RendezVousRepository;

import java.util.List;


@Service
@AllArgsConstructor
public class ServiceRendezVous implements RendezVousCrud{

    RendezVousRepository rvr;

    @Override
    public List<RendezVous> afficherRendezVous() {
        return rvr.findAll();
    }

    @Override
    public RendezVous afficherRendezVousById(Long idRdv) {
        return rvr.findById(idRdv).get();
    }

    @Override
    public RendezVous ajouterRendezVous(RendezVous r) {
        return rvr.save(r);
    }

    @Override
    public void supprimerRendezVous(Long idRdv) {
        rvr.deleteById(idRdv);
    }

    @Override
    public RendezVous modifierRendezVous(RendezVous r) {
        return rvr.save(r);
    }
}
