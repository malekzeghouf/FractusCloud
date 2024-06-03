package tn.esprit.pidev.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.pidev.entities.Collaboration;

@Repository

public interface CollaborationRepo extends JpaRepository<Collaboration,Long> {
}
