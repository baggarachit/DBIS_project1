import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  getData_0(e_id:any) : Observable<any>{
    let url="http://localhost:3080/exam/"+String(e_id);
    return this.http.get(url);
  }
}
