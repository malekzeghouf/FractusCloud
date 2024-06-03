import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-modifier-document',
  templateUrl: './modifier-document.component.html',
  styleUrls: ['./modifier-document.component.css']
})
export class ModifierDocumentComponent {
  id: number = this.activatedRoute.snapshot.params["id"];
  updateDocumentForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private docsService: DocumentService,
    private fb: FormBuilder,
    private router: Router
  ){}


  ngOnInit(){
    this.updateDocumentForm = this.fb.group({
      id: this.id,
      titre: [ null , [Validators.required]],
      dateCreation: [ null , [Validators.required]],
      description  : [ null , [Validators.required]],
      taille : [ null , [Validators.required]],
    });
    this.getDocsById();
  }

  getDocsById(){
    this.docsService.afficherDocumentById(this.id).subscribe((res)=>{
      console.log(res);
      const formattedDate = res.dateCreation.split('T')[0];
      this.updateDocumentForm.patchValue({
        titre: res.titre,
        dateCreation: formattedDate,
        description: res.description,
        taille: res.taille,
      });
    })
  }

  updateDocument(){
    this.docsService.updateDocuemnt(this.id,this.updateDocumentForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id != null){
        this.router.navigateByUrl("/dashboard/afficherDocument");
      }
    })
  }

}
