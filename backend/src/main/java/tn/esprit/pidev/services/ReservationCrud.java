package tn.esprit.pidev.services;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import tn.esprit.pidev.entities.Reservation;

import java.io.IOException;
import java.util.List;

public interface ReservationCrud {
    public List<Reservation> afficherReservation();
    public Reservation afficherReservationById(Long idRes);
    public Reservation ajouterReservation(Reservation r, Long idSalle);
    public void supprimerReservation(Long idRes);
    public Reservation modifierReservation(Reservation r);

    public void generateQRCode(Long idSalle);

    public ResponseEntity<InputStreamResource> downloadQrCode(Long idSalle) throws IOException;
}
