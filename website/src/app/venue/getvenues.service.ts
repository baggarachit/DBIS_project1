import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetvenuesService {

  constructor(private http:HttpClient) {  }
  getData_venues() : Observable<any>{
    let url="http://localhost:3080/venues";
    return this.http.get(url);
  }
}
