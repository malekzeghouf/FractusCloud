import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService} from 'src/app/cours/service.service';

@Component({
  selector: 'app-addcours',
  templateUrl: './addcours.component.html',
  styleUrls: ['./addcours.component.css']
})
export class AddcoursComponent {
 
  validateForm!: FormGroup;

  constructor(private courService: ServiceService,
    private fb: FormBuilder) { }


    ngOnInit() {
      this.validateForm = this.fb.group({
       
        date: [null, [Validators.required]],
        description: [null, [Validators.required]],
        nom: [null, [Validators.required]]
        
      })
    }
  
    postCour() {
      this.courService.postCour(this.validateForm.value).subscribe(res => {
        console.log(res)
      })
    }

}
