import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'DBIS Lab-4';
  constructor(private router: Router) {}

  gotoMatch(){
      this.router.navigate(['/match']);  // define your component where you want to go
  }
}
