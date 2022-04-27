import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YearsService {

  constructor(private http:HttpClient) { }
  getData_years() : Observable<any>{
    let url="http://localhost:3080/years";
    return this.http.get(url);
  }
}

