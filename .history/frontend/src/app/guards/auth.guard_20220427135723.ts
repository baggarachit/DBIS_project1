import { Injectable } from '@angular/core';      
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';      
import { Observable } from 'rxjs';      
import { GlobalConstants } from '../global';
@Injectable({      
   providedIn: 'root'      
})      
export class AuthGuard implements CanActivate {      
   constructor(private router: Router) { }      
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {      
      if (this.isLoggedIn()) {      
      return true;      
      }      
      // navigate to login page as user is not authenticated      
   this.router.navigate(['/login']);      
return false;      
}      
public isLoggedIn(): boolean {      
   let status = false;      
   if (localStorage.getItem('isLoggedIn') == "true") {      
      GlobalConstants.isnav=true;
      status = true;      
   }
     else {   
        GlobalConstants.isnav=false;   
      status = false;      
      }      
   return status;      
   }    
}    