package tn.esprit.pidev.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import tn.esprit.pidev.entities.Enumeration.Role;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import static jakarta.persistence.GenerationType.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Builder

public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy= IDENTITY)
    private long id;
    @NotNull
    private String nom;
    @NotNull
    private String prenom;
    @NotNull
    private int cin;
    private LocalDate dateNaissance;
    private int numtel;
    @NotNull
    @Column(unique = true)
    private String email;
    private String adresse;
    @NotNull
    private String mdp;
    @Enumerated(EnumType.STRING)
    private Role role;
    //Double Auth
    private boolean mfEnabled;
    private String secret ;

    // ban attribut
    @Getter
    private boolean banni;


    @OneToMany(mappedBy = "tuteur")
    @ToString.Exclude
    @JsonIgnore
    List<Cours> cours;


    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "user")
    private Set<Participation>participations;


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userToken")
    @JsonManagedReference
    private List<Token> tokens;

    @OneToOne
    private Quizz quiz;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<RendezVous>RendezVous;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Projet>Projects;



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public String getPassword() {
        return this.mdp;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
