package tn.esprit.pidev.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Participation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idP;
    private Date date;
    private String categoriePar;
    private int nb_participant;



    private String status; // true: accepté, false: refusé

    // Constructeur avec le statut par défaut
    public Participation() {
        this.status = "en attente"; // Par défaut, le statut est "En attente"
    }

    @ManyToOne
    @JoinColumn (name="idCours")
    Cours cour;

    @ManyToOne
    User user;



}
