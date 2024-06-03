import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiURL = 'http://localhost:8082/api/v1/auth/';

  constructor(private http: HttpClient) {
   }

   postCour(cours: any): Observable<any> {
    return this.http.post(this.apiURL + "cours/ajouterOffer/", cours)
  }

  getAllcour(): Observable<any> {
    return this.http.get(this.apiURL + "cours/getall")
  }

  getCourById(id: any): Observable<any> {
    return this.http.get(this.apiURL + `cours/getById/${id}`)
  }


  updateCours(id: number, cours: any): Observable<any> {
    return this.http.put(this.apiURL + `cours/update/${id}`, cours)
  }

  deleteCours(id: number): Observable<any> {
    return this.http.delete(this.apiURL + "cours/deleteC/" + id)
  }

  obtenirStatistiquesParticipations(): Observable<any> {
    return this.http.get<any>(this.apiURL + "user/stat");
  }




}
