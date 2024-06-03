package tn.esprit.pidev.services;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import lombok.AllArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import tn.esprit.pidev.entities.Reservation;
import tn.esprit.pidev.entities.Salle;
import tn.esprit.pidev.repository.ReservationRepository;
import tn.esprit.pidev.repository.SalleRepository;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
@AllArgsConstructor
public class ServiceReservation implements ReservationCrud{

    ReservationRepository rr;
    SalleRepository sr;

    @Override
    public List<Reservation> afficherReservation() {
        return rr.findAll();
    }

    @Override
    public Reservation afficherReservationById(Long idRes) {
        return rr.findById(idRes).get();
    }

    @Override
    public Reservation ajouterReservation(Reservation r, Long idSalle) {
        Salle s = sr.findById(idSalle).get();
        s.setDisponibilite("Réservée");
        r.setSalle(s);
        return rr.save(r);
    }

    @Override
    public void supprimerReservation(Long idRes) {
        Reservation r = rr.findById(idRes).get();
        r.getSalle().setDisponibilite("Disponible");
        rr.deleteById(idRes);
    }

    @Override
    public Reservation modifierReservation(Reservation r) {
        return rr.save(r);
    }


    @Override
    public void generateQRCode(Long idSalle) {
        String resultat="";
        try {
            Salle selectedSalle = sr.findById(idSalle).get();
            if (selectedSalle != null) {
                 resultat = String.format("Nom Salle: %s\nCapacite: %s\n",
                        selectedSalle.getNom(), selectedSalle.getCapacite());
            }
            String filePath = "C:\\Users\\Malek\\Desktop\\Esprit\\4eme\\fractuszip\\backend\\src\\main\\java\\tn\\esprit\\pidev\\qrCode\\qrCodeSalle"+selectedSalle.getId()+".png";

            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(resultat, BarcodeFormat.QR_CODE, 300, 300);

            MatrixToImageWriter.writeToPath(bitMatrix, "PNG", Paths.get(filePath));
        } catch (WriterException | IOException e) {
            throw new RuntimeException(e);
        }
    }


    @Override
    public ResponseEntity<InputStreamResource> downloadQrCode(Long idSalle) throws IOException {
        File file = new File("C:\\Users\\Malek\\Desktop\\Esprit\\4eme\\fractuszip\\backend\\src\\main\\java\\tn\\esprit\\pidev\\qrCode\\qrCodeSalle"+idSalle+".png");
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=qrCodeSalle"+idSalle+".png");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.IMAGE_PNG)
                .contentLength(file.length())
                .body(resource);
    }


}
