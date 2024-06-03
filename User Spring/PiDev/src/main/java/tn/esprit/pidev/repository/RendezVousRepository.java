package tn.esprit.pidev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pidev.entities.RendezVous;

public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {
}
