import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceService} from 'src/app/cours/service.service';

@Component({
  selector: 'app-updatecours',
  templateUrl: './updatecours.component.html',
  styleUrls: ['./updatecours.component.css']
})
export class UpdatecoursComponent {

  validateForm!: FormGroup;
  id: any = this.activatedRoute.snapshot.params['id']

  constructor(private courService: ServiceService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      this.getCoursById();
    }



  getCoursById() {
    this.courService.getCourById(this.id).subscribe((res) => {
      console.log(res);
      this.validateForm.patchValue(res);
    })
  }

}
