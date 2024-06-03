package tn.esprit.pidev.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.pidev.entities.Reservation;
import tn.esprit.pidev.repository.ReservationRepository;

import java.util.List;


@Service
@AllArgsConstructor
public class ServiceReservation implements ReservationCrud{

    ReservationRepository rr;

    @Override
    public List<Reservation> afficherReservation() {
        return rr.findAll();
    }

    @Override
    public Reservation afficherReservationById(Long idRes) {
        return rr.findById(idRes).get();
    }

    @Override
    public Reservation ajouterReservation(Reservation r) {
        return rr.save(r);
    }

    @Override
    public void supprimerReservation(Long idRes) {
        rr.deleteById(idRes);
    }

    @Override
    public Reservation modifierReservation(Reservation r) {
        return rr.save(r);
    }
}
