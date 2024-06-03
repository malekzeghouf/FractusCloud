import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FrontService {

  private apiURL = 'http://localhost:8082/api/v1/auth/';

  constructor(private http: HttpClient) {
   }

    getAllcour(): Observable<any> {
    return this.http.get(this.apiURL + "cours/getall")
  }

  postCour(cours: any,id:number): Observable<any> {
    return this.http.post(this.apiURL + "cours/ajouterOffer/"+id, cours)
  }


  deleteCour(id: number): Observable<any> {
    return this.http.delete(this.apiURL + "cours/deleteC/" + id)
  }

  getAllParticipation(): Observable<any> {
    return this.http.get(this.apiURL + "user/p/getall")
  }


  acceptParticipation(participationId: number): Observable<any> {
    return this.http.put(this.apiURL + "user/"+ participationId +"/accept",{});

  }

  refuseParticipation(participationId: number): Observable<any> {
    return this.http.put(this.apiURL + "user/"+participationId+"/refuse", {});

  }
  getCourById(id: any): Observable<any> {
    return this.http.get(this.apiURL + `cours/getById/${id}`)
  }


  updateCours(id: number, cours: any): Observable<any> {
    return this.http.put(this.apiURL + "cours/update/"+id, cours)
  }
  incrementerNbParticipant(idCours: number, nouveauNbParticipant: number): Observable<any> {
    return this.http.put(`${this.apiURL}/cours/${idCours}/incrementer`, { nb_participant: nouveauNbParticipant });
  }

  Incriment(id :any,idU:any) :Observable<any>{
    let body :any ;

    return this.http.post(this.apiURL+ "user/add/"+id+"/"+idU,body )
  }

  getOtherCours(id: number):Observable<any>{
    return this.http.get(this.apiURL+"cours/OtherCours/"+id);

  }

  //
  getMyCours(id: number):Observable<any>{
    return this.http.get(this.apiURL+"cours/MyCours/"+id);

  }


}
