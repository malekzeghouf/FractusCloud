import {Component, OnInit} from '@angular/core';
import {AppRoutingModule} from "../app-routing.module";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  tokenPayload: any;
  userName: string="";
  roleName: string=""

  ngOnInit() {
    // Retrieve the access token from local storage
    const accessToken: string | null = localStorage.getItem('access_token');

    if (accessToken) {
      // Decode the access token to get the payload
      this.tokenPayload = jwtDecode(accessToken);
      this.roleName = this.tokenPayload.role;
      const email = this.tokenPayload.sub;


// Split the email address into username and domain parts
      const [username, domain] = email.split('@');

// Extract the first letter of the username and convert it to uppercase
      const firstInitial = username.charAt(0).toUpperCase();

// Extract the last name from the username (part before the dot)
      const lastName = username.split('.')[1];

// Concatenate the first initial and last name
      const output = firstInitial + '.' + lastName;


      this.userName = output;
    } else {
      console.error('Access token not found in local storage.');
    }
  }

  signOut() {
    // Clear local storage
    localStorage.clear();
    // Remove the token (if stored under a specific key)
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

}
