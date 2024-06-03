package tn.esprit.pidev.services;

import tn.esprit.pidev.entities.User;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

public interface IServiceUser {
    User creer(User user);
    List<User> lire();
    User getUserById (long id);
    User modifier(long id, User user);
    void supprimer(long id);

    Optional<User> getUser(String email);

    boolean userExist(String email);

    User getCurrentUser(Principal userPrincipal);

    // fonction pour banner

    void banUser(long userId);
    void debanUser(long userId);
    Optional<User> getUserByEmail(String email);

}
