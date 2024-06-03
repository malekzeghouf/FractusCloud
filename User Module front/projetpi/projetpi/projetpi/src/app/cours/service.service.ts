import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiURL = 'http://localhost:8083/'

  constructor(private http: HttpClient) {
   }

   postCour(cours: any): Observable<any> {
    return this.http.post(this.apiURL + "cours/addC", cours)
  }

  getAllcour(): Observable<any> {
    return this.http.get(this.apiURL + "cours/getall")
  }

  getCourById(id: any): Observable<any> {
    return this.http.get(this.apiURL + `cours/getById/${id}`)
  }


  updateCours(id: number, cours: any): Observable<any> {
    return this.http.put(this.apiURL + `cours/updateC/${id}`, cours)
  }

  deleteCours(id: any): Observable<any> {
    return this.http.delete(this.apiURL + `cours/deleteC/${id}`)
  }



 
}
