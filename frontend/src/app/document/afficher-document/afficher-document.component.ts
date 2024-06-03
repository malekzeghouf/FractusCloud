import { Component } from '@angular/core';
import { DocumentService } from '../document.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-afficher-document',
  templateUrl: './afficher-document.component.html',
  styleUrls: ['./afficher-document.component.css']
})
export class AfficherDocumentComponent {
  docs!: any[];

    constructor(
      private http: HttpClient,
      private docsService: DocumentService,
      private router: Router
    ){}

    ngOnInit(){
      this.getDocs();
    }

    getDocs(){
      this.docsService.afficherDocument().subscribe((res) =>{
        console.log(res);
        this.docs = res;
      })
    }

    deleteDocument(id: number){
      this.docsService.supprimerDocument(id).subscribe((res)=>{
        console.log(res);
        this.ngOnInit();
      })
    }

    downloadPdf(fileLocation: string) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/pdf'
      });

      this.http.get('http://51.8.251.179:8082/api/v1/auth/document/download', {
        headers: headers,
        params: {
          fileLocation: fileLocation
        },
        responseType: 'blob'
      }).subscribe((data: Blob) => {
        saveAs(data, 'espritHubDocument.pdf');
      });
    }

}
