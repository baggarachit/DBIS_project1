import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id!: string | null;  
  constructor(private router: Router, private authService: AuthService) { }  
  ngOnInit() {  
    this.id = localStorage.getItem('token');  
    //console.log(this.id);  
  } 
  logout() {  
    console.log('logout');  
    this.authService.logout();  
    this.router.navigate(['/login']);  
  } 

}
