package tn.esprit.pidev.services;


import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import tn.esprit.pidev.entities.RendezVous;
import tn.esprit.pidev.entities.User;
import tn.esprit.pidev.repository.RendezVousRepository;
import tn.esprit.pidev.repository.UserRepository;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;


@Service
@AllArgsConstructor
public class ServiceRendezVous implements RendezVousCrud{
    private final SendMail sendMail;

    RendezVousRepository rvr;
    UserRepository userRepository;
    @Override
    public List<RendezVous> afficherRendezVous() {
        return rvr.findAll() ;
    }

    @Override
    public RendezVous afficherRendezVousById(Long idRdv) {
        return rvr.findById(idRdv).get();
    }




    // Mailing


    @Override
    public void supprimerRendezVous(Long idRdv) {
        rvr.deleteById(idRdv);

    }

    @Override
    public RendezVous modifierRendezVous(RendezVous r) {
        return rvr.save(r);
    }




    // Affectation
    @Override
    @Transactional
    public RendezVous AddRendezVousToUser(RendezVous rendezVous , User user){
        rendezVous.setUser(user); // affecter user to rendezvous
        //sendMail.sendEmail("malek.zeghouf@esprit.tn", "New Rendezvous Added", "A new rendezvous has been added.");
       return rvr.save(rendezVous);
    }


    public void send_SMS(){
        // Initialisation de la bibliothèque Twilio avec les informations de votre compte
        String ACCOUNT_SID = "ACcd8b1393e58dbb5c42c7c470c2204b36";
        String AUTH_TOKEN = "abd9aab081f54cd2ee419e01b50055e2";

        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        String recipientNumber = "+21624447082";
        String message = "Bonjour Mr ,\n"
                + "Nous sommes ravis de vous informer qu'un Rendez-Vous a été ajouté.\n "
                + "Veuillez contactez l'administration pour plus de details.\n "
                + "Merci de votre fidélité et à bientôt chez EspritHub.\n"
                + "Cordialement,\n"
                + "EspritHub";

        Message twilioMessage = Message.creator(
                new PhoneNumber(recipientNumber),
                new PhoneNumber("+12569800269"),message).create();

        System.out.println("SMS envoyé : " + twilioMessage.getSid());
    }

}
