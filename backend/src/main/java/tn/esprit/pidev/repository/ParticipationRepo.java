package tn.esprit.pidev.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.pidev.entities.Cours;
import tn.esprit.pidev.entities.Participation;


import java.util.List;
@Repository
public interface ParticipationRepo extends JpaRepository<Participation,Long> {

int countByCour(Cours cour);

    @Query("SELECT p.categoriePar, COUNT(p) FROM Participation p GROUP BY p.categoriePar")
    List<Object[]> countParticipationsByCour();
    
}
