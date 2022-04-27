import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  constructor(private api:ApiService){
  }
  data: any; 
  headers = ["Match_ID", "Team_1", "Team_2", "Winner","Venue", "City", "Year"]
  ngOnInit(){
    this.api.getData_next().subscribe(data=>{
      console.log(data);
      this.data = data;
    })
  }


  next(){
    this.api.getData_next().subscribe(data=>{
      console.log(data);
      this.data = data;
    })  // define your component where you want to go
  }

  prev(){
    this.api.getData_prev().subscribe(data=>{
      console.log(data);
      this.data = data;
    })  // define your component where you want to go
  }

}
