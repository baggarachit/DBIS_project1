import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './details.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private details:DetailsService) { }
  data_bat1: any; 
  data_bat2: any; 
  data_ball1: any; 
  data_ball2: any; 
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const matchIdFromRoute = Number(routeParams.get('matchId'));
    // console.log(matchIdFromRoute);
    this.details.getData_bat1(matchIdFromRoute).subscribe(data=>{
      console.log(data);
      this.data_bat1 = data;
    })
    this.details.getData_bat2(matchIdFromRoute).subscribe(data=>{
      console.log(data);
      this.data_bat2 = data;
    })
    this.details.getData_ball1(matchIdFromRoute).subscribe(data=>{
      console.log(data);
      this.data_ball1 = data;
    })
    this.details.getData_ball2(matchIdFromRoute).subscribe(data=>{
      console.log(data);
      this.data_ball2 = data;
    })
    
  }

}
