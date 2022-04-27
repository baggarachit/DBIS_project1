import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute } from '@angular/router';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
  // ChartComponent,
  // ApexAxisChartSeries,
  // ApexChart,
  ApexFill,
  // ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  // ApexXAxis
} from "ng-apexcharts";

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

export type ChartOptions1 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
};


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptions1: Partial<ChartOptions1> | any;

  runs: Array<any> = [];
  matchid: Array<any> = [];
  colors: Array<any> = [];
  runs1: Array<any> = [];
  matchid1: Array<any> = [];
  wickets1: Array<any> = [];
  
  constructor(private api:ApiService,private route: ActivatedRoute){
    this.chartOptions = {
      series: [
        {
          name: 'Runs',
          data: ["1","22","33","22","3","4","5"]
          // data: this.runs
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          // click: function(chart, w, e) {
          //   // console.log(chart, w, e)
          // }
        }
      },
      colors: ["1","2","3","4","5","6","7"],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        type: "string",
        title:{
          text: "Match ID"
        },
        categories: ["1","2","3","4","5","6","7"],
        // categories: this.matchid,
        labels: {
          style: {
            fontSize: "12px"
          }
        }
      },
      yaxis: {
        type: "string",
        title:{
          text: "Runs"
        }
      },
    };
    this.chartOptions1 = {
      series: [
        {
          name: "Runs",
          type: "column",
          data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
        },
        {
          name: "Wickets",
          type: "line",
          data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "Bowling Statistics"
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: [
        "01 Jan 2001",
        "02 Jan 2001",
        "03 Jan 2001",
        "04 Jan 2001",
        "05 Jan 2001",
        "06 Jan 2001",
        "07 Jan 2001",
        "08 Jan 2001",
        "09 Jan 2001",
        "10 Jan 2001",
        "11 Jan 2001",
        "12 Jan 2001"
      ],
      xaxis: {
        type: "string",
        title:{
          text: "Match ID"
        }
      },
      yaxis: [
        {
          title: {
            text: "Runs"
          }
        },
        {
          opposite: true,
          title: {
            text: "Wickets"
          }
        }
      ]
    };
  }
  data: any; 
  data2:any;
  data3:any;
  data4:any;
  data5:any;
  headers = ["Player_Name", "Country", "Batting_Style", "Bowling_Skill"];
  headers2= ["Matches","Runs","Four","Six","Fifty","HS","Strike_Rate","Average"];
  headers3= ["Matches","Runs","Wickets","Overs","Balls","Economy","Five_Wickets"];

  ngOnInit(){
    this.route.paramMap.subscribe(params=>{
      var player_id:any;
      player_id=params.get('player_id');
      this.api.getData_0(player_id).subscribe(data=>{
        console.log(data);
        this.data = data["data1"];
        this.data2 = data["data2"];
        this.data3=data["data3"];
        this.data4=data["data4"];
        this.data5=data["data5"];
        for(let i=0;i<this.data3.length;i++){
          // console.log(this.data3[i]["match_id"]);
          this.matchid.push(this.data3[i]["match_id"]);
          if(this.data3[i]["runs_scored_low"]!=0){
            this.runs.push(this.data3[i]["runs_scored_low"]);
            this.colors.push("#008FFB");
          } else if(this.data3[i]["runs_scored_middle"]!=0){
            this.runs.push(this.data3[i]["runs_scored_middle"]);
            this.colors.push("#00E396");
          } else{
            this.runs.push(this.data3[i]["runs_scored_high"]);
            this.colors.push("#FEB019");
          }
        }
        for(let i=0;i<this.data5.length;i++){
          this.matchid1.push(this.data5[i]["match_id"]);
          this.runs1.push(this.data5[i]["runs"]);
          this.wickets1.push(this.data5[i]["wickets"]);
        }
        this.chartOptions.series = [
          {
            name: 'Runs',
            data: this.runs
          }
        ];
        this.chartOptions.colors=this.colors;
        this.chartOptions.xaxis={
            categories: this.matchid,
            // categories: this.matchid,
            labels: {
              style: {
                fontSize: "12px"
              }
            }
          }
        
        this.chartOptions1.series = [
          {
            name: "Runs",
            type: "column",
            data: this.runs1
          },
          {
            name: "Wickets",
            type: "line",
            data: this.wickets1
          }
        ];
        this.chartOptions1.labels = this.matchid1;
      })
    });
  }

}
