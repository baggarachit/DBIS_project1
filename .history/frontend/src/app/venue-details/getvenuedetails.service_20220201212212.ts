import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetvenuedetailsService {

  constructor(private http:HttpClient) { }
  getData_venuedet(matchIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/venue/"+String(matchIdFromRoute);
    return this.http.get(url);
  }
}
