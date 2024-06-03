package tn.esprit.pidev.entities;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Data
@AllArgsConstructor


public class Collaboration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idcollab;
    @ManyToOne
    Projet projet;
    @ManyToOne
    User user;
    private String status;
    private  int nb_participant;

    public Collaboration() {
        status="en attente";

    }
}
