import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poinstable',
  templateUrl: './poinstable.component.html',
  styleUrls: ['./poinstable.component.css']
})
export class PoinstableComponent implements OnInit {

  constructor(private api:ApiService,private route: ActivatedRoute) { }
  data:any;
  headers=["Team Name","Matches","Won","Lost","Tied","NRR","Points"];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      var year:any;
      year=params.get('year');
      this.api.getData_0(year).subscribe(data=>{
        console.log(data);
        this.data=data;
      });
    });
  }

}
