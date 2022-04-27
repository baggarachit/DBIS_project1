import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './details.service';
import {Chart, registerables, ChartType} from 'chart.js'

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private details:DetailsService) { 
    Chart.register(...registerables);
  }
  headers_bat = ["Batter",  "Balls faced", "Runs", "fours", "sixes"];
  headers_ball = ["Bowler", "Balls Bowled", "Runs Given", "Wickets"];
  headers_match_info = ["Match ID", "team1_name", "team2_name", "toss_winner","Opted","Year", "Venue"]
  data_bat1: any; 
  data_bat2: any; 
  data_ball1: any; 
  data_ball2: any; 
  data_info: any;
  data_ump: any;
  data_t1p: any;
  data_t2p: any;
  data_i1: any = [];
  data_i2: any = [];
  myChart: any;
  l: ChartType = "line";
  ngOnInit(): void {
    const labels =  Array.from(Array(120),(x,i)=>i+1);
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data:  Array.from(Array(120),(x,i)=>i+1),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
  
    const config = {
      type: this.l,
      data: data,
      xAxes: [{
        type: 'time',
        ticks: {
            autoSkip: true,
            maxTicksLimit: 20
        }
    }]
    };
    
    this.myChart = new Chart("Chart", config);
    
    const routeParams = this.route.snapshot.paramMap;
    const matchIdFromRoute = Number(routeParams.get('matchId'));
    this.details.getData_bat1(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_bat1 = data;
    })
    this.details.getData_bat2(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_bat2 = data;
    })
    this.details.getData_ball1(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_ball1 = data;
    })
    this.details.getData_ball2(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_ball2 = data;
    })
    this.details.getData_info(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_info = data;
    })
    this.details.getData_ump(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_ump = data;
    })
    this.details.getData_t1p(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_t1p = data;
    })
    this.details.getData_t2p(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_t2p = data;
    })
    this.details.getData_i1(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_i1 = data;
    })
    this.details.getData_i2(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_i2 = data;
    })
    
  }

}
