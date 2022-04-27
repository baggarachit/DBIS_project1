import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsService } from './details.service';
import {Chart, registerables, ChartType} from 'chart.js'

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private details:DetailsService, private router: Router) { 
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
  order_bat: any=[];
  scores: any=[0,0];
  wickets: any=[0,0];
  i1_out1: any;
  i1_out2: any;
  i1_out3: any;
  i1_out4: any;
  i2_out1: any;
  i2_out2: any;
  i2_out3: any;
  i2_out4: any;
  data_overall: any;

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
    }
    var labels =  [];
    for (let i = 0; i < 120; i++) {
      if(i%6==0){
        labels.push(String(i/6));
      }
      else labels.push('');
    }
    function customRadius1( context: { dataIndex: any; dataset: { data: { [x: string]: any; }; }; } )
    {
      let index = context.dataIndex;
      if(inn1_wi[index]) return 5;
      return 0;
    }
    function customRadius2( context: { dataIndex: any; dataset: { data: { [x: string]: any; }; }; } )
    {
      let index = context.dataIndex;
      if(inn2_wi[index]) return 5;
      return 0;
    }
    const dataa = {
      labels: labels,
      datasets: [{
        label: 'Team 1',
        pointRadius: customRadius1,
        data:  inn1_runs,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Team 2',
        pointRadius: customRadius2,
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
      // options: {
      //   maintainAspectRatio: false,
      // }
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
    this.details.getData_overall(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_overall = data;
    })
    this.details.getData_info(matchIdFromRoute).subscribe(data=>{
      console.log(data);
      this.data_info = data;
      if((data[0].toss_winner==data[0].team1 && data[0].opt=="field") || (data[0].toss_winner==data[0].team2 && data[0].opt=="bat")) this.order_bat=[data[0].team2, data[0].team1];
      else this.order_bat=[data[0].team1, data[0].team2];
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
      this.scores[0]=data[data.length-1].runs;
      for(let i=0; i<data.length; i++){
        if(data[i].wicket) this.wickets[0]++;
      }
    })
    this.details.getData_i2(matchIdFromRoute).subscribe(data=>{
      this.data_inn2 = data;
      this.scores[1]=data[data.length-1].runs;
      for(let i=0; i<data.length; i++){
        if(data[i].wicket) this.wickets[1]++;
      }
    })
    this.details.getData_i1_batsum(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      var out1 =[];
      var out2 =[];
      for(let i=0; i<3; i++) {
        if(i>=data.length) {
          out1.push("");
          out2.push("");
        }
        else {
          out1.push(data[i].player_name);
          out2.push(data[i].runs+"("+data[i].balls+")");
      }
    }
    this.i1_out1 = out1;
    this.i1_out2 = out2;
    })
    this.details.getData_i2_batsum(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      var out1 =[];
      var out2 =[];
      for(let i=0; i<3; i++) {
        if(i>=data.length) {
          out1.push("");
          out2.push("");
        }
        else {
          out1.push(data[i].player_name);
          out2.push(data[i].runs+"("+data[i].balls+")");
      }
    }
    this.i2_out1 = out1;
    this.i2_out2 = out2;
    })
    this.details.getData_i1_ballsum(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      var out1 =[];
      var out2 =[];
      for(let i=0; i<3; i++) {
        if(i>=data.length) {
          out1.push("");
          out2.push("");
        }
        else {
          out1.push(data[i].pname);
          out2.push(data[i].wckts+"-"+data[i].runs+"  "+data[i].overs+"."+data[i].balls+" overs");
      }
    }
    this.i1_out3 = out1;
    this.i1_out4 = out2;
    })
    this.details.getData_i2_ballsum(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      var out1 =[];
      var out2 =[];
      for(let i=0; i<3; i++) {
        if(i>=data.length) {
          out1.push("");
          out2.push("");
        }
        else {
          out1.push(data[i].pname);
          out2.push(data[i].wckts+"-"+data[i].runs+"  "+data[i].overs+"."+data[i].balls+" overs");
      }
    }
    this.i2_out3 = out1;
    this.i2_out4 = out2;
  })
}

  view_comp(){
    this.create_plot();
  }

  view_summ(){
    this.router.navigate(['/matches/'+this.data_info[0].match_id+"/summary"]);
  }
}
