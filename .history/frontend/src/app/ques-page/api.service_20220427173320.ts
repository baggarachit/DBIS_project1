import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  getData_0(q_id:any) : Observable<any>{
    let url="http://localhost:3080/ques/"+String(q_id);
    return this.http.get(url);
  }
}
