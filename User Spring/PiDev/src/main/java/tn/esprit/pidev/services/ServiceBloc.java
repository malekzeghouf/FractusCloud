package tn.esprit.pidev.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.pidev.entities.Bloc;
import tn.esprit.pidev.repository.BlocRepository;

import java.util.List;


@Service
@AllArgsConstructor
public class ServiceBloc implements BlocCrud{
    BlocRepository br;

    @Override
    public List<Bloc> afficherBloc() {
        return br.findAll();
    }

    @Override
    public Bloc afficherBlocById(Long idBloc) {
        return br.findById(idBloc).get();
    }

    @Override
    public Bloc ajouterBloc(Bloc b) {
        return br.save(b);
    }

    @Override
    public void supprimerBloc(Long idBloc) {
        br.deleteById(idBloc);
    }

    @Override
    public Bloc modifierBloc(Bloc b) {
        return br.save(b);
    }
}
