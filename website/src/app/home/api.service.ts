import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getData_0(uid:any, role:any) : Observable<any>{
    let url="http://localhost:3080/courses/"+String(role)+"/"+String(uid);
    return this.http.get(url);
  }
  getData_ta(uid:any) : Observable<any>{
    let url="http://localhost:3080/courses/"+String(uid);
    return this.http.get(url);
  }
}
