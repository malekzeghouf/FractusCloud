package tn.esprit.pidev.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.pidev.entities.Rating;

import tn.esprit.pidev.entities.RendezVous;
import tn.esprit.pidev.entities.User;
import tn.esprit.pidev.repository.RatingRepository;
import tn.esprit.pidev.repository.RendezVousRepository;
import tn.esprit.pidev.repository.UserRepository;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceRating implements RatingCrud{
    @Autowired
    RatingRepository ratingRepository;

    @Autowired
    RendezVousRepository rendezVousRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private SendMail sendMail;

    @Autowired
    private ServiceRendezVous serviceRendezVous;

    @Override
    public void addRating(Rating r) {
        ratingRepository.save(r);
    }

    @Override
    public void deleteRating(Rating r) {
        ratingRepository.delete(r);
    }

    @Scheduled(cron = "* * 1 * * *")
    public void sendRatingMails(){
        System.out.println("Emails CRON");
        List<RendezVous> list = rendezVousRepository.findByDateRdvAndHeure(new Date(), LocalTime.now().getHour());
        for (RendezVous rdv: list){
            User user = rdv.getUser();
            String emailContent =
                    "Cher(e) Patient(e),\n\n" +
                    "Nous espérons que vous allez bien !\n\n" +
                    "Nous tenions à vous remercier d'avoir choisi nos services pour votre rendez-vous récent. Nous apprécions vraiment votre confiance en nous et nous nous efforçons de fournir la meilleure expérience possible.\n" +
                    "Votre avis est extrêmement important pour nous. Nous aimerions connaître votre expérience et toutes les suggestions que vous pourriez avoir pour nous aider à nous améliorer. Votre avis nous aidera non seulement à mieux vous servir, mais également à aider d'autres clients à prendre des décisions éclairées.\n" +
                    "Veuillez prendre un moment pour laisser votre avis en cliquant sur le lien suivant :\n\n" +
                    "Lien de l'avis : http://localhost:4200/dashboard/rate/"+ rdv.getId()+"\n\n" +
                    "Merci encore de nous avoir choisis. Nous avons hâte d'avoir de vos nouvelles !\n\n" +
                    "Cordialement,\n" +
                    "Esprit Hub";
            sendMail.sendEmail(user.getEmail(), "A propos de votre rendez-Vous",emailContent);
        }


    }
    public Rating getRatingByRdvId(Long idRdv){
        RendezVous rdv = serviceRendezVous.afficherRendezVousById(idRdv);
        return ratingRepository.findByRdv(rdv);
    }

    @Transactional
    public void deleteRatingByRdv(RendezVous rdv){
        ratingRepository.deleteByRdvId(rdv);
    }
}
