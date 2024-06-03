import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = ["http://localhost:8082/api/v1/auth"]

@Injectable({
  providedIn: 'root'
})
export class BlocService {

  constructor(private http: HttpClient) { }

  postBloc(bloc : any): Observable<any> {
    return this.http.post(BASIC_URL + "/bloc/add", bloc);
  }

  updateBloc(id: number,bloc : any): Observable<any> {
    return this.http.put(BASIC_URL + "/bloc/update/"+id, bloc);
  }

  afficherBloc(): Observable<any>{
    return this.http.get(BASIC_URL+"/bloc/all");
  }

  afficherBlocById(id: number): Observable<any>{
    return this.http.get(BASIC_URL+"/bloc/show/"+id);
  }

  supprimerBloc(id: number): Observable<any>{
    return this.http.delete(BASIC_URL+"/bloc/delete/"+id);
  }
}
