import { Component } from '@angular/core';
import { ApiService } from './api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(private api:ApiService){
  }
  data: any; 
  headers = ["Match_ID", "Team_1", "Team_2", "Winner","Venue", "City", "Year"]
  ngOnInit(){
    // console.log("hello");
    this.api.getData().subscribe(data=>{
      console.log(data);
      this.data = data;
    })
  }
}
