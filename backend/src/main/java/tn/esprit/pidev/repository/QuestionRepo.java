package tn.esprit.pidev.repository;

import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pidev.entities.Question;


@Repository


public interface QuestionRepo extends JpaRepository<Question,Long> {
}
