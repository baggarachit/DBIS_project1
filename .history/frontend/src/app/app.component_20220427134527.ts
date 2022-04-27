import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'DBIS Lab-4';
  isnav: boolean = true;
  // ngOnInit(){
  //   if(localStorage.getItem('isLoggedIn')=="true") this.isnav=true;
  // }
  constructor(private router: Router) {}
}
