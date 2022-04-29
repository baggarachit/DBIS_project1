import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Form } from './form'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url="http://localhost:3080/question/add";
  constructor(private http:HttpClient) { }
  private headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

  postreq(form:Form) : Observable<any>{
    return this.http.post<Form>(this.url,form);
  }
}
