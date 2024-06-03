import { Component } from '@angular/core';
import { UserService } from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: any[] = [];


  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getAllUsers();

  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      console.log(res);
      this.users = res;

    })
  }

    deleteUser(id: number) {
      this.userService.deleteUser(id).subscribe((res) => {
        console.log(res);
        this.getAllUsers();
        this.router.navigateByUrl("/afficherUser");


      })
  }
  toggleBan(user: any): void {
    if (user.banni) {
     this.debannerUser(user.id);
    } else {
      this.BannerUser(user.id);
    }
  }

  BannerUser(id: number) {
    this.userService.bannerUser(id).subscribe((res) => {
      console.log(res);
      this.getAllUsers();
      this.router.navigateByUrl("/dashboard/afficherUser");


    })
  }

  debannerUser(id: number) {
    this.userService.dabannerUser(id).subscribe((res) => {
      console.log(res);
      this.getAllUsers();
      this.router.navigateByUrl("/dashboard/afficherUser");


    })
  }


}
