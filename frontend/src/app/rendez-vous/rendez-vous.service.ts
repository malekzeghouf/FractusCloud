import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from './model/Rating';



const BASIC_URL ="http://localhost:8082/api/v1/auth"
export interface RdvModel {
        id?: number ;
        titre: string;
        dateRdv: string ;
        description: string ;
        heure: number ;
        status: string ;
        remarques: string ;
        contact: string ;
        user:User

 }
 export interface User{

    id: number;
    nom: string;
    prenom: string;
    cin: number;
    dateNaissance: string;
    numtel: number;
    email: string;
    adresse: string;
    mdp: number;
    role: string;

}

@Injectable({
  providedIn: 'root'
})


export class RendezVousService {

  constructor(private http: HttpClient) { }

  postRendezVous(id: number,RendezVous : any ): Observable <any>{
    return this.http.post(BASIC_URL + "/rendezVous/ajout/"+id, RendezVous);
  }

  afficherRendezVous(): Observable<RdvModel[]> {
    return this.http.get<RdvModel[]>(BASIC_URL + "/rendezVous/all");
  }

  updateRendezVous(id: number, RendezVous: any): Observable<any>{
    return this.http.put(BASIC_URL+"/rendezVous/update/"+id,RendezVous);
  }

  afficherRendezVousById(id: number): Observable<any>{
    return this.http.get(BASIC_URL+"/rendezVous/show/"+id);
  }

  supprimerRendezVous(id: number): Observable<any>{
    return this.http.delete(BASIC_URL+"/rendezVous/delete/"+id);
  }

  ajouterRating(body: any){
    return this.http.post(BASIC_URL + "/rendezVous/addrating",body);
  }
  getRatingByRdv(idRdv: number){
    return this.http.get<Rating>(BASIC_URL + "/rendezVous/getrating/" + idRdv).toPromise();
  }
}
