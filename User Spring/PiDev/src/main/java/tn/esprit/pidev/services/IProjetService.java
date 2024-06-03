package tn.esprit.pidev.services;
import tn.esprit.pidev.entities.Projet;
import tn.esprit.pidev.entities.User;

import java.util.List;

public interface IProjetService {
    public Projet addprojet(Projet p);
    public Projet update(Projet p);
    public List<Projet> getallprojet();
    public Projet getbyid( long idprojet);
    void delete(long idprojet);
    public Projet AddProjetToUser(Projet projet, User user);
}
