import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  getpaper(e_id:any) : Observable<any>{
    let url="http://localhost:3080/temp_api/"+String(e_id);
    return this.http.get<any>(url);
  }
}

