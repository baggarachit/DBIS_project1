import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  get_paper(c_id:any, Difficulty: any, Duration: any, Marks: any, Topics: any) : Observable<any>{
    let url="http://localhost:3080/get-new-exam";
    let queryParams = new HttpParams();
    queryParams = queryParams.append("course",c_id);
    queryParams = queryParams.append("difficulty",Difficulty);
    queryParams = queryParams.append("duration",Duration);
    queryParams = queryParams.append("marks",Marks);
    queryParams = queryParams.append("topics",Topics);
    return this.http.get(url, {params:queryParams});
  }
}
