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
  data = [];
  ngOnInit(){
    // console.log("hello");
    this.api.getData().subscribe(data=>{
      this.data = data;
    })
  }
}
