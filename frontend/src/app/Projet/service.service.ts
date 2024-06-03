import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url = 'http://localhost:8082/api/v1/auth/';

  constructor(private http: HttpClient) {

  }
    postProjet( Projet: any,id:number) : Observable<any> {
      return this.http.post(this.url + "projet/ajouterOffer/"+id, Projet);
      }


     getAll() : Observable<any>{
      return this.http.get(this.url + "projet/getall");

     }


     update( Projet: any, id: number) : Observable <any>
     {
     return this.http.put(this.url + `projet/update/${id}`, Projet);}

     getbyId(id: number) : Observable<any>
     {
      return this.http.get(this.url+ `projet/getProjet/${id}`) ;
     }
     delete(id:number): Observable <any> {
      return this.http.delete(this.url +`projet/delete/${id}`);
     }
     ajouQuizz(id:number ,  Quiz:any):Observable<any>{
       return this.http.post(this.url+"pic/projet/affecterQuizz/"+id , Quiz );
     }
     getQuestionsForProjectQuiz(projectId: number): Observable<any[]> {
      return this.http.get<any[]>(this.url+"questions/getquizzbyprojetthenQuestion/"+projectId);
    }


  getOtherProjets(id: number):Observable<any>{
    return this.http.get(this.url+"projet/OtherProjects/"+id);

  }

  //
  getMyProjets(id: number):Observable<any>{
    return this.http.get(this.url+"projet/MyProjects/"+id);

  }




}
