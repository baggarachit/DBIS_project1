// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';

// import { Observable } from 'rxjs';
import { Form } from './form'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  getData_00(q_id:any) : Observable<any>{
    let url="http://localhost:3080/question_analytics/"+String(q_id);
    return this.http.get(url);
  }
  getData_0(q_id:any) : Observable<any>{
    let url="http://localhost:3080/ques/"+String(q_id);
    return this.http.get(url);
  }
  getData_1(u_id:any,q_id:any) : Observable<any>{
    let url="http://localhost:3080/isfeed/"+String(u_id)+"/"+String(q_id);
    return this.http.get(url);
  }
  private headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
  private url="http://localhost:3080/feedback/add";
  postreq(form:Form,qid:any,sid:any) : Observable<any>{
    this.url= "http://localhost:3080/feedback/add"+"/"+String(qid)+"/"+String(sid);
    console.log(form);
    return this.http.post<Form>(this.url,form);
  }
}
