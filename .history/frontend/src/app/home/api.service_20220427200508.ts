import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getData_stud(uid:any) : Observable<any>{
    let url="http://localhost:3080/stud/courses/"+String(uid);
    return this.http.get(url);
  }
  getData_prof(uid:any) : Observable<any>{
    let url="http://localhost:3080/prof/courses/"+String(uid);
    return this.http.get(url);
  }
}
