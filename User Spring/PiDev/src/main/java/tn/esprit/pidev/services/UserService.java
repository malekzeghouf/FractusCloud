package tn.esprit.pidev.services;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import tn.esprit.pidev.entities.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.pidev.repository.UserRepository;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service

public class UserService implements IServiceUser {

    private UserRepository userRepository;
    @Override
    public User creer(User user) {
        return userRepository.save(user);
    }
    @Override
    public List<User> lire() {
        return userRepository.findAll();
    }
    @Override
    public User getUserById (long id){
        return userRepository.findById(id).orElse(null);
    }
    @Override
    public User modifier(long id, User user) {
        return userRepository.findById(id).map(user1 -> {
            user1.setNom(user.getNom());
            user1.setPrenom(user.getPrenom());
            user1.setCin(user.getCin());
            user1.setAdresse(user.getAdresse());
            user1.setDateNaissance(user.getDateNaissance());
            user1.setNumtel(user.getNumtel());
            user1.setEmail(user.getEmail());
            user1.setMdp(user.getMdp());
            user1.setRole(user.getRole());
            return userRepository.save(user1);

        }).orElse(null);
    }

    @Override
    public void supprimer(long id) {
        userRepository.deleteById(id);
       /* return "Utilisateur supprimer" ; */
    }

    @Override
    public Optional<User> getUser(String email) {
        return userRepository.findByEmail(email);
    }
    @Override
    public boolean userExist(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User getCurrentUser(Principal connectedUser) {
        if (connectedUser instanceof UsernamePasswordAuthenticationToken) {
            Object principal = ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
            if (principal instanceof UserDetails) {
                return (User) principal;
            }
        }
        return null;
    }

    @Override
    public void banUser(long userId) {
        Optional<User> optionalUser =userRepository.findById(userId);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            user.setBanni(true);
            userRepository.save(user);
        }
        else {
            throw new EntityNotFoundException("Utilisateur inexistant : " + userId);
        }
    }

    @Override
    public void debanUser(long userId) {

        Optional<User> optionalUser =userRepository.findById(userId);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            user.setBanni(false);
            userRepository.save(user);
        }
        else {
            throw new EntityNotFoundException("Utilisateur inexistant " );
        }

    }



}
