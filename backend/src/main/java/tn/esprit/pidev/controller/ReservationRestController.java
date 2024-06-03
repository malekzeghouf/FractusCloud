package tn.esprit.pidev.controller;


import lombok.AllArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pidev.entities.Reservation;
import tn.esprit.pidev.repository.ReservationRepository;
import tn.esprit.pidev.services.ServiceReservation;

import java.io.IOException;
import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/auth")
@CrossOrigin("*")
public class ReservationRestController {
    ServiceReservation serviceReservation;
    ReservationRepository rr;

    @GetMapping("/reservation/all")
    public List<Reservation> getReservation(){
        List<Reservation> listReservation = serviceReservation.afficherReservation();
        return listReservation;
    }

    @GetMapping("/reservation/show/{id}")
    public Reservation showReservation(@PathVariable("id") Long reservationId){
        Reservation reservation = serviceReservation.afficherReservationById(reservationId);
        return reservation;
    }

    @PostMapping("/reservation/add/{idSalle}")
    public Reservation addReservation(@RequestBody Reservation r,@PathVariable("idSalle") Long idSalle) throws IOException {
        serviceReservation.generateQRCode(idSalle);
        Reservation res = serviceReservation.ajouterReservation(r,idSalle);
        return res;
    }

    @DeleteMapping("/reservation/delete/{id}")
    public void deleteReservation(@PathVariable("id") Long reservationId){
        serviceReservation.supprimerReservation(reservationId);
    }

    @PutMapping("/reservation/update")
    public Reservation updateReservation(@RequestBody Reservation r){
        Reservation reservation = serviceReservation.modifierReservation(r);
        return reservation;
    }

    @GetMapping("/reservation/download/{idSalle}")
    public ResponseEntity<InputStreamResource> downloadQrCode(@PathVariable("idSalle") Long idSalle) throws IOException {
        return serviceReservation.downloadQrCode(idSalle);
    }

}
