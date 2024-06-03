package tn.esprit.pidev.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.pidev.entities.Salle;
import tn.esprit.pidev.repository.SalleRepository;

import java.util.List;


@Service
@AllArgsConstructor
public class ServiceSalle implements SalleCrud{

    SalleRepository sr;

    @Override
    public List<Salle> afficherSalle() {
        return sr.findAll();
    }

    @Override
    public Salle afficherSalleById(Long idSalle) {
        return sr.findById(idSalle).get();
    }

    @Override
    public Salle ajouterSalle(Salle s) {
        return sr.save(s);
    }

    @Override
    public void supprimerSalle(Long idSalle) {
        sr.deleteById(idSalle);
    }

    @Override
    public Salle modifierSalle(Salle s) {
        return sr.save(s);
    }
}
