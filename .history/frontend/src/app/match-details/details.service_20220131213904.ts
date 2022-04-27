import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http:HttpClient) { }
  getData_bat1(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/match/bat1/"+String(matchIdFromRoute);
    return this.http.get(url);
  }
  getData_ball1(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/match/ball1/"+String(matchIdFromRoute);
    return this.http.get(url);
  }
  getData_bat2(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/match/bat2/"+String(matchIdFromRoute);
    return this.http.get(url);
  }
  getData_ball2(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/match/ball2/"+String(matchIdFromRoute);
    return this.http.get(url);
  }
}
