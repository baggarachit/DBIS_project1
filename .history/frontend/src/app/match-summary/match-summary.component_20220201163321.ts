import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, ChartType, registerables } from 'chart.js';
import { SummaryService } from './summary.service';

@Component({
  selector: 'app-match-summary',
  templateUrl: './match-summary.component.html',
  styleUrls: ['./match-summary.component.css']
})
export class MatchSummaryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private details:SummaryService, private router: Router) { 
    Chart.register(...registerables);
  }
  order_bat: any=[];
  scores: any=[0,0];
  wickets: any=[0,0];
  data_info: any;
  i1_out1: any;
  i1_out2: any;
  i1_out3: any;
  i1_out4: any;
  i2_out1: any;
  i2_out2: any;
  i2_out3: any;
  i2_out4: any;
  pie: any;
  p: ChartType = "pie";
  pieChart1: any;
  pieChart2: any;
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const matchIdFromRoute = Number(routeParams.get('matchId'));
    this.details.getData_info(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_info = data;
      if((data[0].toss_winner==data[0].team1 && data[0].opt=="field") || (data[0].toss_winner==data[0].team2 && data[0].opt=="bat")) this.order_bat=[data[0].team2, data[0].team1];
      else this.order_bat=[data[0].team1, data[0].team2];
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
  this.details.getData_i1(matchIdFromRoute).subscribe(data=>{
    this.scores[0]=data[data.length-1].runs;
    for(let i=0; i<data.length; i++){
      if(data[i].wicket) this.wickets[0]++;
    }
  })
  this.details.getData_i2(matchIdFromRoute).subscribe(data=>{
    this.scores[1]=data[data.length-1].runs;
    for(let i=0; i<data.length; i++){
      if(data[i].wicket) this.wickets[1]++;
    }
  })
  this.details.getData_pie(matchIdFromRoute).subscribe(data=>{
    console.log(data);
    this.pie=data;
    var inn1_per=[data[0].ones, data[0].twos, data[0].threes, data[0].fours, data[0].sixes, data[0].extras];
    var inn2_per=[data[1].ones, data[1].twos, data[1].threes, data[1].fours, data[1].sixes, data[1].extras];
    var labels =  ["ones", "twos", "threes", "fours", "sixes", "extras"];

    const dataa = {
      labels: labels,
      datasets: [{
        label: 'Team 1',
        data: inn1_per,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(255, 0, 86)',
          'rgb(255, 205, 0)',
          'rgb(0, 205, 20)'
        ],
        hoverOffset: 4
      },
    ]
    };
  
    const config = {
      type: this.p,
      data: dataa,
      // options: options
    };
    this.pieChart1 = new Chart("pie1", config);
  })

  }

}
