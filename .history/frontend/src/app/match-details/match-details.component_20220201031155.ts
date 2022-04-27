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
  data_inn1: any;
  data_inn2: any;
  myChart: any;
  l: ChartType = "line";

  create_plot(): void {
    var inn1_runs=[];
    var inn1_wi: any[]=[];
    var inn2_runs=[];
    var inn2_wi: any[]=[];
    console.log(this.data_inn1);
    var n =this.data_inn1.length;
    var m =this.data_inn2.length;
    for (let i = 0; i < 120; i++) {
      if(i>=n){
        inn1_runs.push(this.data_inn1[n-1].runs);
        inn1_wi.push(false);
      }
      else{
        inn1_runs.push(this.data_inn1[i].runs);
        inn1_wi.push(this.data_inn1[i].wicket);
      }
      if(i>=m){
        inn2_runs.push(this.data_inn2[m-1].runs);
        inn2_wi.push(false);
      }
      else{
        inn2_runs.push(this.data_inn2[i].runs);
        inn2_wi.push(this.data_inn2[i].wicket);
      }
      // inn2_runs.push(this.data_inn2[i].runs);
      // inn2_wi.push(this.data_inn2[i].wicket);
    }
    // console.log(inn2_runs);
    var labels =  [];
    for (let i = 0; i < 120; i++) {
      if(i%6==0){
        labels.push(String(i/6));
      }
      else labels.push('');
    }
    const options = {

      elements: {
        point: {
          radius : customRadius,
          display: true
        }
      }
    }
    function customRadius( context: { dataIndex: any; dataset: { data: { [x: string]: any; }; }; } )
    {
      let index = context.dataIndex;
      if(inn1_wi[index]) return 5;
      return 0;
      let value = context.dataset.data[ index ];
      return index === 3 || value >= 8 ?
             10 :
             2;
    }
    const dataa = {
      labels: labels,
      datasets: [{
        label: 'Team 1',
        data:  inn1_runs,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Team 2',
        data:  inn2_runs,
        fill: false,
        borderColor: 'rgb(0, 0, 192)',
        tension: 0.1
      }
    ]
    };
  
    const config = {
      type: this.l,
      data: dataa,
      options: options
    };
    this.myChart = new Chart("Chart", config);
  }

  ngOnInit(): void {
    
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
      this.data_inn1 = data;
    })
    this.details.getData_i2(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_inn2 = data;
      // this.create_plot();
    })
 
  }
  view_comp(){
    console.log(this.data_inn1);
    this.create_plot();
  }

}
