package tn.esprit.pidev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pidev.entities.Cours;

public interface CoursRepository extends JpaRepository<Cours, Long> {
}
