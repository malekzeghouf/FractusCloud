import { Component } from '@angular/core';
import { ServiceService} from 'src/app/cours/service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-getcours',
  templateUrl: './getcours.component.html',
  styleUrls: ['./getcours.component.css']
})
export class GetcoursComponent {

  cours: any = [];


  constructor(
    private coursService: ServiceService) { }

  ngOnInit() {
    this.getAllcours();

  }

  getAllcours() {
    this.coursService.getAllcour().subscribe((res) =>{
      console.log(res);
      this.cours=res;

    })

    }

    deleteUser(id: any) {
      this.coursService.deleteCours(id).subscribe((res) => {
        console.log(res);
        this.getAllcours();
      })
    }


  }


