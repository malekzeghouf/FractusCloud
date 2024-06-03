package tn.esprit.pidev.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.pidev.entities.Question;
import tn.esprit.pidev.repository.QuestionRepo;

@Service
@AllArgsConstructor
public class QusetionService {
    QuestionRepo questionRepo;


}
