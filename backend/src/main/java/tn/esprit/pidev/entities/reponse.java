package tn.esprit.pidev.entities;


import javax.xml.crypto.Data;
import java.util.Date;
import java.util.Set;

import jakarta.persistence.*;


@Entity
@Table(name= "reponse")


public class reponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reponses;

    private long objet_rep;

    private long contenue_rep;

    @OneToOne
    private reclamation reclamations ;
}
