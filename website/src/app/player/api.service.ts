import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getData_0(id:string) : Observable<any>{
    let url="http://localhost:3080/player/"+id;
    return this.http.get(url);
  }
}
