package tn.esprit.pidev.services;

import tn.esprit.pidev.entities.Document;

import java.util.List;

public interface DocumentCrud {
    public List<Document> afficherDocument();
    public Document afficherDocumentById(Long idDoc);
    public Document ajouterDocument(Document d);
    public void supprimerDocument(Long idDoc);
    public Document modifierDocument(Document d);
}
