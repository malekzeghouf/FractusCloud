package tn.esprit.pidev.services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.pidev.entities.Projet;
import tn.esprit.pidev.entities.Question;
import tn.esprit.pidev.entities.Quizz;
import tn.esprit.pidev.entities.User;
import tn.esprit.pidev.repository.ProjetRepo;
import tn.esprit.pidev.repository.QuestionRepo;
import tn.esprit.pidev.repository.UserRepository;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class ProjetService implements IProjetService {
    @Autowired
    ProjetRepo projetRepo;
    @Autowired
    QuestionRepo qr;
    @Autowired
    UserRepository ur;


    @Override
    public Projet addprojet(Projet p) {
        return (projetRepo.save(p));
    }

    @Override
    public Projet update(Projet p) {
        return (projetRepo.save(p));
    }

    @Override
    public List<Projet> getallprojet() {
        return projetRepo.findAll();
    }

    @Override
    public Projet getbyid(long idprojet) {
        return projetRepo.findById(idprojet).get();
    }

    @Override
    public void delete(long idprojet) {
    projetRepo.deleteById(idprojet);
    }

        @Override
    @Transactional
    public Projet AddProjetToUser(Projet projet, User user) {
        projet.setUser(user); // Affecter l'utilisateur à l'offre

        return projetRepo.save(projet);


    }

    public List<Projet> listedesprojets(long idp){
        List<Projet> list = new ArrayList<>();
        User u = ur.findById(idp).get();
        List<Projet> lp = getallprojet();
        for(Projet p : lp){
            if(p.getUser().getId()==u.getId()){
                list.add(p);
            }
        }

        return list;  }

    public List<Projet> listeOtherProjets(long idp){
        List<Projet> list = new ArrayList<>();
        User u = ur.findById(idp).get();
        List<Projet> lp = getallprojet();
        for(Projet p : lp){
            if(p.getUser().getId()!=u.getId()){
                list.add(p);
            }
        }

        return list;  }






///* affecter quizz a un projet !!

    /*
     public void AffecterQuizzaunProjet(long idprojet, List<Question> quizz ){
         Projet p = projetRepo.findById(idprojet).get();
         Set<Question> sq = new HashSet<>();
         for (Question q : quizz){
             sq.add(q);
             q.setP(p);
             qr.save(q);
         }
         p.setQs(sq);

    }
*/

}
