package tn.esprit.pidev.controller;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pidev.entities.Bloc;
import tn.esprit.pidev.services.ServiceBloc;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/auth")
@CrossOrigin("*")
public class BlocRestController {
    ServiceBloc serviceBloc;

    @GetMapping("/bloc/all")
    public List<Bloc> getBloc(){
        List<Bloc> listBloc = serviceBloc.afficherBloc();
        return listBloc;
    }

    @GetMapping("/bloc/show/{id}")
    public Bloc showBloc(@PathVariable("id") Long blocId){
        Bloc bloc = serviceBloc.afficherBlocById(blocId);
        return bloc;
    }

    @PostMapping("/bloc/add")
    public Bloc addBloc(@RequestBody Bloc b){
        Bloc bloc = serviceBloc.ajouterBloc(b);
        return bloc;
    }

    @DeleteMapping("/bloc/delete/{id}")
    public void deleteBloc(@PathVariable("id") Long blocId){
        serviceBloc.supprimerBloc(blocId);
    }


    @PutMapping("/bloc/update/{id}")
    public Bloc updateBloc(@PathVariable Long id, @RequestBody Bloc b){
        Bloc existingBloc = serviceBloc.afficherBlocById(id);
        Bloc updatedBloc = null;

        if(existingBloc != null){
            existingBloc.setStatut(b.getStatut());
            existingBloc.setTitre(b.getTitre());
            updatedBloc = serviceBloc.modifierBloc(b);
        }
        return updatedBloc;
    }

}
