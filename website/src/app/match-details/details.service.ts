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
  getData_overall(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/match/overall/"+String(matchIdFromRoute);
    return this.http.get(url);
  }
  getData_info(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/match/info/"+String(matchIdFromRoute);
    return this.http.get(url);
  }
  getData_ump(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/match/umpires/"+String(matchIdFromRoute);
    return this.http.get(url);
  }
  getData_t1p(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/match/t1p/"+String(matchIdFromRoute);
    return this.http.get(url);
  }
  getData_t2p(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/match/t2p/"+String(matchIdFromRoute);
    return this.http.get(url);
  }

  getData_i1(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/match/i1/"+String(matchIdFromRoute);
    return this.http.get(url);
  }
  getData_i2(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/match/i2/"+String(matchIdFromRoute);
    return this.http.get(url);
  }
  getData_i1_batsum(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/match/i1_batsum/"+String(matchIdFromRoute);
    return this.http.get(url);
  }
  getData_i2_batsum(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/match/i2_batsum/"+String(matchIdFromRoute);
    return this.http.get(url);
  }
  getData_i1_ballsum(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/match/i1_ballsum/"+String(matchIdFromRoute);
    return this.http.get(url);
  }
  getData_i2_ballsum(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/match/i2_ballsum/"+String(matchIdFromRoute);
    return this.http.get(url);
  }
  getData_whowon(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/match/whowon/"+String(matchIdFromRoute);
    return this.http.get(url);
  }
}
