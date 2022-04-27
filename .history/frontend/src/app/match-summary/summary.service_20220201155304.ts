import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private http:HttpClient) { }
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
  getData_info(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/match/info/"+String(matchIdFromRoute);
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
}
