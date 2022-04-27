import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http:HttpClient) { }
  getData_0(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/match/details";
    return this.http.get(url);
  }
}
