package tn.esprit.pidev.entities;


import jakarta.persistence.*;

@Entity
@Table(name= "reclamation")

public class reclamation {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long num_recl;

    @Enumerated(EnumType.STRING)
    private tn.esprit.pidev.entities.typeReclamation typeReclamation;

    private String objet;

    private String contenue;

    private String propiétaire;

    @OneToOne(mappedBy = "reclamations")
    private reponse reponse;






}
