import { Component, OnInit } from '@angular/core';
import { YearsService } from './years.service';

@Component({
  selector: 'app-ptland',
  templateUrl: './ptland.component.html',
  styleUrls: ['./ptland.component.css']
})
export class PtlandComponent implements OnInit {

  constructor(private api: YearsService) { }
  data: any;
  ngOnInit(): void {
    this.api.getData_years().subscribe(data=>{
      console.log(data);
      this.data = data;
    })
  }

}
