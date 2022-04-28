import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from './form';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  get_paper(form:Form) : Observable<any>{
    let url="http://localhost:3080/get-new-exam";
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",form.Difficulty);
    return this.http.get(url);
  }
}
