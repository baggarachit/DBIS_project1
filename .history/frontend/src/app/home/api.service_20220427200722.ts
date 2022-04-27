import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getData_0(uid:any, role:string) : Observable<any>{
    let url="http://localhost:3080/"+role+"/courses/"+String(uid);
    return this.http.get(url);
  }
}
