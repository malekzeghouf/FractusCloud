package tn.esprit.pidev.entities;


import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AffectationRequest {
    private User utilisateur;
    private Cours cours;
    private Projet projet;
}
