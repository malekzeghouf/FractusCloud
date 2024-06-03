package tn.esprit.pidev.controller;


import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pidev.entities.Bloc;
import tn.esprit.pidev.entities.Salle;
import tn.esprit.pidev.services.ServiceBloc;
import tn.esprit.pidev.services.ServiceSalle;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/auth")
@CrossOrigin("*")
public class SalleRestController {
    ServiceSalle serviceSalle;
    ServiceBloc serviceBloc;

    @GetMapping("/salle/all")
    public List<Salle> getSalle(){
        List<Salle> listSalle = serviceSalle.afficherSalle();
        return listSalle;
    }

    @GetMapping("/salle/show/{id}")
    public Salle showSalle(@PathVariable("id") Long salleId){
        Salle salle = serviceSalle.afficherSalleById(salleId);
        return salle;
    }

    @DeleteMapping("/salle/delete/{id}")
    public void deleteSalle(@PathVariable("id") Long salleId){
        serviceSalle.supprimerSalle(salleId);
    }

    @PutMapping("/salle/update/{id}/{idBloc}")
    public Salle updateSalle(@PathVariable Long id,@PathVariable("idBloc") long idB,@RequestBody Salle s){
        Salle existingSalle = serviceSalle.afficherSalleById(id);
        Bloc bloc=serviceBloc.afficherBlocById(idB);
        Salle updatedSalle = null;

        if(existingSalle != null){
            s.setNom(s.getNom());
            existingSalle.setCapacite(s.getCapacite());
            existingSalle.setDisponibilite(s.getDisponibilite());
            s.setBloc(bloc);
            updatedSalle = serviceSalle.modifierSalle(s);
        }
        return updatedSalle;
    }

    @PostMapping("/salle/ajouterSalleBloc/{idBloc}")
    public void ajouterSalle(@RequestBody Salle salle,@PathVariable("idBloc") long idB){
        Bloc bloc=serviceBloc.afficherBlocById(idB);
        serviceSalle.ajouterSalleBloc(salle,bloc);
    }

}
