import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getData_0() : Observable<any>{
    let url="http://localhost:3080/match";
    return this.http.get(url);
  }
  getData_next() : Observable<any>{
    let url="http://localhost:3080/match/next";
    return this.http.get(url);
  }
  getData_prev() : Observable<any>{
    let url="http://localhost:3080/match/prev";
    return this.http.get(url);
  }
}
