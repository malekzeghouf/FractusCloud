package tn.esprit.pidev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pidev.entities.Cours;

@Repository
public interface CoursRepo extends JpaRepository<Cours,Long> {
}
