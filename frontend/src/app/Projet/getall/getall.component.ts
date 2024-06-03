import { Component } from '@angular/core';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-getall',
  templateUrl: './getall.component.html',
  styleUrls: ['./getall.component.css']
})
export class  GetallComponent {
  projets: any = [];
 

  constructor(private projetService: ServiceService) { }

  ngOnInit() {
    this. getAllprojet();
   
   
  }
  getAllprojet(){
    this.projetService.getAll().subscribe((data: any[])=>{  this.projets= data});
      
      
    }
    deleteProjet(id : number) {
      this.projetService.delete(id).subscribe((res) => {
        console.log(res);
        this.getAllprojet()})
    } 
      
  }



