package tn.esprit.pidev.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.pidev.entities.Document;
import tn.esprit.pidev.repository.DocumentRepository;

import java.util.List;
@Service
@AllArgsConstructor
public class ServiceDocument  implements DocumentCrud{
    DocumentRepository dr ;
    @Override
    public List<Document> afficherDocument() {
        return dr.findAll() ;
    }

    @Override
    public Document afficherDocumentById(Long idDoc) {
        return dr.findById(idDoc).get();
    }

    @Override
    public Document ajouterDocument(Document d) {
        return dr.save(d);
    }

    @Override
    public void supprimerDocument(Long idDoc) {
        dr.deleteById(idDoc);

    }

    @Override
    public Document modifierDocument(Document d) {
        return dr.save(d);
    }
}
