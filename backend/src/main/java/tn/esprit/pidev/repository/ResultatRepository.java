package tn.esprit.pidev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pidev.entities.Resultat;

@Repository
public interface ResultatRepository extends JpaRepository<Resultat,Long> {
}
