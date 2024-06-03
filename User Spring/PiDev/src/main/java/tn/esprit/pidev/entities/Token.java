package tn.esprit.pidev.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tn.esprit.pidev.entities.Enumeration.Role;
import tn.esprit.pidev.entities.Enumeration.TokenType;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String token;
    @Enumerated(EnumType.STRING)
    private TokenType tokenType;
    private boolean expired;
    private boolean revoked;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id")
    private User userToken;
    @Enumerated(EnumType.STRING)
    private Role role ;


}