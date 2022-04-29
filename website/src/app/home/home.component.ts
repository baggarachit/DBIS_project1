import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from '../global';
import { AuthService } from '../login/api.service';
import { ApiService } from './api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  id!: string | null; 
  role!: string | null;
  data: any; 
  ta_data: any;
  colors: string[] = ['lightblue', 'lightgreen', 'lightpink', '#DDBDF1', 'lightred', 'lightpurple', 'yellow', 'lightgrey', 'lightorange'];
  tiles: any[]=[];
  ta_tiles: any[]=[];
    // tiles: any[] = [
    //   {text: 'One', cols: 1, rows: 2, color: 'lightblue'},
    //   {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    //   {text: 'Three', cols: 1, rows: 2, color: 'lightpink'},
    //   {text: 'Four', cols: 1, rows: 2, color: '#DDBDF1'},
    // ];
  constructor(private router: Router, private api: ApiService, private authService: AuthService ) { }  
  ngOnInit() {  
    this.id = localStorage.getItem('token');  
    this.role = localStorage.getItem('role');  
    if(this.role=='professor') {
      this.role='prof';
      GlobalConstants.isonlystudent=false;
    }
    this.api.getData_0(this.id,this.role).subscribe(data=>{
      console.log(data);
      this.data = data;
      for(var i=0;i<this.data.length;i++){
        this.tiles.push({text: this.data[i].name, cols: 1, rows: 2, color: this.colors[this.data[i].c_id%9], id: this.data[i].c_id, ista: false});
      }
      console.log(this.tiles);
    })
    if(this.role=='student'){
      this.api.getData_ta(this.id).subscribe(data=>{
      console.log(data);
      this.ta_data = data;
      if(this.ta_data.length!=0){
        GlobalConstants.isonlystudent=false;
      }
      else{
        GlobalConstants.isonlystudent=true;
      }
      for(var i=0;i<this.ta_data.length;i++){
        this.tiles.push({text: this.ta_data[i].name, cols: 1, rows: 2, color: this.colors[this.ta_data[i].c_id%9], id: this.ta_data[i].c_id, ista: true});
      }
    })  
   } 
 }
  logout() {  
    GlobalConstants.isnav=false;
    console.log('logout');  
    this.authService.logout();  
    this.router.navigate(['/login']);  
  } 
  new_exam(){
    console.log("wow");
  }

}
