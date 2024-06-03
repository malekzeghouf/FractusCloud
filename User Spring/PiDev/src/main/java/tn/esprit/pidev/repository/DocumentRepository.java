package tn.esprit.pidev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pidev.entities.Document;

public interface DocumentRepository extends JpaRepository<Document, Long> {
}
