package tn.esprit.pidev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pidev.entities.Participation;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {
}
