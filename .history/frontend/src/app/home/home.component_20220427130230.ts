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
    tiles: any[] = [
      {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
      {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
      {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
      {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    ];
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
