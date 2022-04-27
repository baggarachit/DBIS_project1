import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/api.service';
import { ApiService } from './api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id!: string | null; 
  data: any; 
  constructor(private router: Router, private api: ApiService, private authService: AuthService ) { }  
  ngOnInit() {  
    this.id = localStorage.getItem('token');  
    this.api.getData_0(this.id).subscribe(data=>{
      console.log(data);
      this.data = data;
    })
    //console.log(this.id);  
  } 
  logout() {  
    console.log('logout');  
    this.authService.logout();  
    this.router.navigate(['/login']);  
  } 

}
