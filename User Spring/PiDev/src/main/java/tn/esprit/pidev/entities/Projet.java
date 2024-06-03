package tn.esprit.pidev.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor


public class Projet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idprojet;
    private String nom;
    private String description;
    private int nombre;


    private String specialite;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "projet")
    private Set<Collaboration> collaborations;


    @ManyToOne
    @ToString.Exclude

    //@JoinColumn(name = "tuteur_id")
    User Participant;
@JsonIgnore
    @OneToOne
    private Quizz quizz;



  /*  @OneToMany(cascade = CascadeType.ALL, mappedBy="p")
    private Set<Question> qs;
*/




}
