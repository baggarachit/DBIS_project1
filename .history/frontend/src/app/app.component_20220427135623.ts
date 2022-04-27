import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from './global'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'DBIS Lab-4';
  get isnav() {
    return GlobalConstants.isnav;
  }
  ngOnInit(){
    if(localStorage.getItem('isLoggedIn')=="true") GlobalConstants.isnav=true;
    else GlobalConstants.isnav=true;
  }
  constructor(private router: Router) {}
}
