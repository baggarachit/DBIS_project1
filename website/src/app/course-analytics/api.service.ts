import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
    getData_0(c_id:any) : Observable<any>{
      let url="http://localhost:3080/course/"+String(c_id)+"/analytics";
      return this.http.get(url);
    }
  }
