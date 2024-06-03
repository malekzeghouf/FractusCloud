import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = ["http://localhost:8082/api/v1/auth"]

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  postReservation(reservation : any, idSalle: number): Observable<any> {
    return this.http.post(BASIC_URL + "/reservation/add/"+idSalle, reservation);
  }

  updateReservation(id: number,reservation : any): Observable<any> {
    return this.http.put(BASIC_URL + "/reservation/update/"+id, reservation);
  }

  afficherReservation(): Observable<any>{
    return this.http.get(BASIC_URL+"/reservation/all");
  }

  afficherReservationById(id: number): Observable<any>{
    return this.http.get(BASIC_URL+"/reservation/show/"+id);
  }

  supprimerReservation(id: number): Observable<any>{
    return this.http.delete(BASIC_URL+"/reservation/delete/"+id);
  }

  downloadQrCode(idSalle:number): Observable<Blob> {
    return this.http.get(BASIC_URL+'/reservation/download/'+idSalle, { responseType: 'blob' });
  }
}
