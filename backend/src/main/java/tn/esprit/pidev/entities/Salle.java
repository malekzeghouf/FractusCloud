package tn.esprit.pidev.entities;


import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Set;


@Entity
@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Salle implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nom;
    private int capacite;
    private String disponibilite;

    @ManyToOne
    Bloc bloc;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="salle")
    private Set<Reservation> Reservations;


}
