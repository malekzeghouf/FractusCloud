package tn.esprit.pidev.entities;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tn.esprit.pidev.entities.User;

@Getter
@Setter
@NoArgsConstructor
public class Affectationrequest {
    private User user;
    private Projet projet;

}
