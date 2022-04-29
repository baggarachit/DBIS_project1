import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';    
import { Observable } from 'rxjs';
import { GlobalConstants } from '../global';

    
@Injectable({    
   providedIn: 'root'    
})    
export class AuthService {    
   constructor(private http:HttpClient) { }    
   logout() :void {    
   GlobalConstants.isnav = false;
   localStorage.setItem('isLoggedIn','false');    
   localStorage.removeItem('token');    
   }    
   check(uid: string, pwd: string) : Observable<any>{
    let url="http://localhost:3080/participant/"+uid+"/"+pwd;
    return this.http.get(url);
  }
}   