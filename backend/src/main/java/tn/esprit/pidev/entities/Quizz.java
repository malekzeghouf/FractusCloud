package tn.esprit.pidev.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Quizz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idQ;
    private String title;
@JsonIgnore
    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL)

    private List<Question> questions;
@JsonIgnore
    @OneToMany( cascade = CascadeType.ALL)
    private List<Resultat> results;
@JsonIgnore
    @OneToOne(mappedBy="quizz")
    private Projet projet;

    @OneToOne(mappedBy="quiz")
    private User user;
}
