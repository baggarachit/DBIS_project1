import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  getpaper(e_id:any) : Observable<any>{
    console.log("fjfjf");
    console.log(e_id);
    let url="http://localhost:3080/getpaper/"+e_id["Difficulty"]+"/"+e_id["Duration"]+"/"+e_id["Marks"]+"/"+e_id["Topics"];
    return this.http.get<any>(url);
  }
}

