import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from '../document.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ajouter-document',
  templateUrl: './ajouter-document.component.html',
  styleUrls: ['./ajouter-document.component.css']
})
export class AjouterDocumentComponent {
  postDocumentForm! : FormGroup ;

  selectedFile!: File;


  constructor(private documentService:DocumentService ,
    private fb:FormBuilder,
    private router: Router ){}

  ngOnInit(){
    this.postDocumentForm = this.fb.group({
      titre: [ null , [Validators.required]],
      dateCreation: [ null , [Validators.required]],
      description  : [ null , [Validators.required]],
      taille : [ null , [Validators.required]],
      path: [ null , [Validators.required]]
    })
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      console.log('Selected file:', this.selectedFile);
      // You can add further logic here, such as displaying the file name or handling the file data
      this.postDocumentForm.patchValue({
        path: "C:\\Users\\Malek\\Desktop\\Esprit\\4eme\\fractuszip\\backend\\src\\main\\java\\tn\\esprit\\pidev\\pdf\\"+this.selectedFile.name // You'll only get the file name, not the full path
      });
    } else {
      console.log('No file selected.');
    }
  }


  postDocument(){
    console.log(this.postDocumentForm.value)
    this.documentService.postDocument(this.postDocumentForm.value,this.selectedFile).subscribe((res) =>{
      console.log(res);
      this.router.navigateByUrl("/dashboard/afficherDocument");
    })

    }

}
