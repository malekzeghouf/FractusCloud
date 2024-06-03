package tn.esprit.pidev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;
import tn.esprit.pidev.entities.Quizz;

@Repository
public interface RepoQuizz extends JpaRepository<Quizz,Long> {
}
