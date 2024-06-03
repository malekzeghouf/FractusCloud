import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, of, tap, throwError} from "rxjs";
import {VerificationRequest} from "../Services/models/verification-request";
import {AuthenticationRequest} from "../Services/models/authentication-request";
import {AuthenticationResponse} from "../Services/models/authentication-response";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  @Output() isUser: EventEmitter<boolean> = new EventEmitter();
  @Output() isAdmin: EventEmitter<boolean> = new EventEmitter();
  @Output() logoutEvent: EventEmitter<boolean> = new EventEmitter();
  loggedIn = new BehaviorSubject<boolean>(false);
  tokenPayload: any;



  private apiURL = 'http://localhost:8082/api/v1/auth/'

  constructor(private http: HttpClient) {
  }
  getAllUsers(): Observable<any> {
    return this.http.get(this.apiURL + "user/all")
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.apiURL + `user/delete/${id}`)
  }
  bannerUser(id: number): Observable<any> {
    const data = {id};
    return this.http.post(this.apiURL+`user/ban/${id}`,data)
  }

  dabannerUser(id: number): Observable<any> {
    const data = {id};
    return this.http.post(this.apiURL+`user/deban/${id}`,data)
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(this.apiURL + `user/${id}`)
  }

  checkUserByEmail(email: any): Observable<HttpResponse<any>> {
    return this.http.get(this.apiURL + `exist_user?email=${email}`, { observe: 'response', responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('error', error);
          return throwError('Server error occurred');
        })
      );
  }
  updateUser(id: number, users :any): Observable<any> {
    return this.http.put(this.apiURL + 'user/update/${id}',users)
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post
    (this.apiURL + 'authenticate',loginRequest).pipe(
        tap((res:any)=>localStorage.setItem('access_token',res.accessToken)),
        tap((res:any)=>localStorage.setItem('refresh_token',res.refreshToken))
    );
  }

  authenticate(authRequest: any): Observable<any> {
    return this.http.post<AuthenticationResponse>
    (`${this.apiURL}/login`,authRequest);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
  set access_token(access_token :string){
    localStorage.setItem('access_token', access_token);
  }

  get access_token(){
    return localStorage.getItem('access_token') as string;
  }
  set refresh_token(refresh_token :string){
    localStorage.setItem('refresh_token',refresh_token);

  }
  get refresh_token(){
    return localStorage.getItem('refresh_token') as string;
  }

  verifyCode(verificationRequest: VerificationRequest) {
    return this.http.post<AuthenticationRequest>
    (`${this.apiURL}/verify`, verificationRequest);
  }

  forgetPassword(email: string){
    let url = `${this.apiURL}forget-password?email=${email}`;
    console.log(url)
    return this.http.put<string>(url, email);

  }

  ///set-password

  // resetPassword(email: string, newPassword: string): Observable<string> {
  //   // const url = `${this.apiURL}set-password?email=${email}&newPassword=${newPassword};`
  //   //
  //   // // Constructing the request headers
  //   // // const headers = new HttpHeaders({
  //   // //   'Content-Type': 'application/json',
  //   // //   'newPassword': newPassword
  //   // // });
  //   // console.log(newPassword)
  //   // console.log(url)
  //   //
  //   // // Sending the PUT request with email in query param and new password in header
  //   // return this.http.put<string>(url , '');
  // }
  resetPassword(email: string, newPassword: string): Observable<string> {
    const url = `${this.apiURL}set-password`;

    // Constructing the request headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'newPassword': newPassword
    });

    // Sending the PUT request with email in query param and new password in header
    return this.http.put<string>(url, {}, { params: { email }, headers: headers });
  }

  getUserByemail(email: any): Observable<any> {
    return this.http.get(this.apiURL + `user/getUserByEmails/${email}`);
  }

  getUserByToken(): Observable<any> {
    const accessToken: string | null = localStorage.getItem('access_token');



    // Decode the access token to get the payload
    this.tokenPayload = jwtDecode(accessToken!);
    const email = this.tokenPayload.sub;

    console.log(accessToken);

    return this.getUserByemail(email).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null); // or throw an error
      })
    );
  }

}
