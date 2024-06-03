package tn.esprit.pidev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pidev.entities.Projet;
@Repository
public interface ProjetRepo extends JpaRepository<Projet,Long> {

}
