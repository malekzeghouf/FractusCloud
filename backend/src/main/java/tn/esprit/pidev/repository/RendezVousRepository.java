package tn.esprit.pidev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pidev.entities.RendezVous;

import java.util.Date;
import java.util.List;

public interface RendezVousRepository extends JpaRepository<RendezVous,Long> {

    List<RendezVous> findByDateRdvAndHeure(Date dateRdv, int heure);
}
