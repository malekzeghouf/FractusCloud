package tn.esprit.pidev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pidev.entities.Salle;

public interface SalleRepository extends JpaRepository<Salle, Long> {
}
