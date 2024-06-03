package tn.esprit.pidev.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor

public class Cours implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idCours;


    private String categorie;
    private Date date;
    private String description;
    private int duree;
    private float prix;

    private int nb_participant;
    private int nb_participant_max;

    public Cours(){this.nb_participant=0;}


    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "cour")
    private Set<Participation>participations;

    @JsonIgnore
    @ManyToOne
    @ToString.Exclude

    //@JoinColumn(name = "tuteur_id")
    User tuteur;






}
