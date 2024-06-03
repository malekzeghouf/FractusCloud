package tn.esprit.pidev.controller;

import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.pidev.entities.Document;
import tn.esprit.pidev.repository.DocumentRepository;
import tn.esprit.pidev.services.ServiceDocument;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/auth")
@CrossOrigin("*")
public class DocumentRestController {
    ServiceDocument serviceDocument ;
    DocumentRepository dr;

    @GetMapping("/document/all")
    public List<Document> getdocument(){
        List<Document>  listDocument = serviceDocument.afficherDocument();
        return listDocument;

    }
    @GetMapping("/document/show/{id}")
    public Document showDocument(@PathVariable("id") Long DocumentId ){

        Document  document = serviceDocument.afficherDocumentById(DocumentId);
        return document ;

    }
    @PostMapping("/document/ajout")
    public Document addDocument (@RequestBody Document d){
        Document document= serviceDocument.ajouterDocument(d);
        return document ;
    }

    @DeleteMapping ("/document/delete/{id}")
    public void deleteDocument (@PathVariable("id") Long DocumentId){

        serviceDocument.supprimerDocument(DocumentId);
    }


    @PutMapping("/document/update/{id}")
    public Document updateDocument (@PathVariable Long id,@RequestBody Document d){
        Document docExisting = serviceDocument.afficherDocumentById(id);
        Document document = null;
        if(docExisting != null){
            docExisting.setTitre(d.getTitre());
            docExisting.setDateCreation(d.getDateCreation());
            docExisting.setDescription(d.getDescription());
            docExisting.setTaille(d.getTaille());
        }
        document = serviceDocument.modifierDocument(d);
        return document;
    }



    @GetMapping("/document/download")
    public ResponseEntity<Resource> downloadPdf(@RequestParam("fileLocation") String fileLocation) throws IOException {
        // Generate or fetch the PDF file
        File pdfFile = new File(fileLocation);

        // Set the file content type to application/pdf
        MediaType mediaType = MediaType.APPLICATION_PDF;

        // Create a Resource object from the file
        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(pdfFile.toPath()));

        // Return response entity with file content and headers
        return ResponseEntity.ok()
                .contentType(mediaType)
                .contentLength(pdfFile.length())
                .body(resource);
    }


}

