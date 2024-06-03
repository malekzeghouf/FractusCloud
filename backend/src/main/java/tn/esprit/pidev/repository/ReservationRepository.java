package tn.esprit.pidev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pidev.entities.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
