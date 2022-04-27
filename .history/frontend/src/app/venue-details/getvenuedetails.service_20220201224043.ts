import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetvenuedetailsService {

  constructor(private http:HttpClient) { }
  getData_venuedet(venueIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/venue/"+String(venueIdFromRoute);
    return this.http.get(url);
  }
  getData_venuepie(venueIdFromRoute: Number) : Observable<any>{
    let url="http://localhost:3080/venue/winpie/"+String(venueIdFromRoute);
    return this.http.get(url);
  }
}
