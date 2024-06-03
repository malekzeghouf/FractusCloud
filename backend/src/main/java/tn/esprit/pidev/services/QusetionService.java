package tn.esprit.pidev.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.pidev.entities.Question;
import tn.esprit.pidev.entities.Quizz;
import tn.esprit.pidev.repository.QuestionRepo;
import tn.esprit.pidev.repository.RepoQuizz;

@Service
@AllArgsConstructor
public class QusetionService {
    QuestionRepo questionRepo;
    @Autowired
    RepoQuizz repoQuizz;

    public int Nombredeq(long idquizz){
        Quizz quizz = repoQuizz.findById(idquizz).get();
        return  quizz.getQuestions().size();
    }


}
