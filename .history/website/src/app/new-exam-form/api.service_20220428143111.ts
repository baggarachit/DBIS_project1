import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from './form';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  get_paper(form:Form, c_id:any) : Observable<any>{
    let url="http://localhost:3080/get-new-exam";
    let queryParams = new HttpParams();
    queryParams = queryParams.append("course",c_id);
    queryParams = queryParams.append("difficulty",form.Difficulty);
    queryParams = queryParams.append("duration",form.Duration);
    queryParams = queryParams.append("marks",form.Marks);
    queryParams = queryParams.append("topics",form.Topics);
    return this.http.get(url, {params:queryParams});
  }
}
