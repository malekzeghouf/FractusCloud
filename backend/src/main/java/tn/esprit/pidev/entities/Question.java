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

public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;

    @ElementCollection
    private List<String> options;

    private int correctAnswer;

    private int selectedAnswer;
    public int getSelectedAnswer() {
        return selectedAnswer;
    }




    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quizz quiz;
}

