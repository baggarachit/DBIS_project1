import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexStroke,
  ApexMarkers
} from "ng-apexcharts";

// type ApexXAxis = {
//   type?: "category" | "datetime" | "numeric";
//   categories?: any;
//   labels?: {
//     style?: {
//       colors?: string | string[];
//       fontSize?: string;
//     };
//   };
// };

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  tooltip: any;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
  yaxis: ApexYAxis;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
};

export type ChartOptions2 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'course-analytics',
  templateUrl: './course-analytics.component.html',
  styleUrls: ['./course-analytics.component.css']
})
export class CourseAnalyticsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions2> | any;
  public chartOptions3: Partial<ChartOptions2> | any;
  public chartOptions4: Partial<ChartOptions2> | any;
  // public chartOptions1: Partial<ChartOptions1> | any;

  cpi_list: Array<any> = [];
  dep_list: Array<any> = [];
  depl_list_cnt: Array<any> = [];
  year_list: Array<any> = [];
  year_cnt: Array<any> = [];
  topic_list: Array<any> = [];
  topic_cnt: Array<any> = [];

  constructor(private api:ApiService,private route: ActivatedRoute){
    this.chartOptions = {
      series: [
        {
          name: "Series 1",
          data: [20, 100, 40, 30, 50, 80, 33]
        }
      ],
      chart: {
        height: 350,
        type: "radar"
      },
      dataLabels: {
        enabled: true
      },
      plotOptions: {
        radar: {
          size: 140,
          polygons: {
            strokeColor: "#e9e9e9",
            fill: {
              colors: ["#f8f8f8", "#fff"]
            }
          }
        }
      },
      title: {
        text: "Radar with Polygon Fill"
      },
      colors: ["#FF4560"],
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColors: ["#FF4560"],
        strokeWidth: 2
      },
      xaxis: {
        categories: ['5-6', '6-7', '7-8', '8-9', '9-10'],
      },
      yaxis: {
        tickAmount: 7,
      }
    };
    this.chartOptions2 = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 780,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.chartOptions3 = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.chartOptions4 = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
  data : string[] = [];
  cpi=["5-6","6-7","7-8","8-9","9-10"];

  ngOnInit(){
    this.route.paramMap.subscribe(params=>{
      var c_id:any;
      c_id=params.get('c_id');
      this.api.getData_0(c_id).subscribe(data=>{
        console.log(data);
        var tmp = data["cpi-distri"][0];
        this.cpi_list.push(tmp["five"]);
        this.cpi_list.push(tmp["six"]);
        this.cpi_list.push(tmp["seven"]);
        this.cpi_list.push(tmp["eight"]);
        this.cpi_list.push(tmp["nine"]);
        var tmp = data["dept-count"];
        for(let i=0;i<tmp.length;i++){
          this.dep_list.push(tmp[i]["department"]);
          this.depl_list_cnt.push(Number(tmp[i]["count"]));
        }
        var tmp = data["total-students"];
        for(let i=0;i<tmp.length;i++){
          this.year_list.push('Year '+tmp[i]["year"]);
          this.year_cnt.push(Number(tmp[i]["count"]));
        }
        var tmp = data["ques-per-topic"];
        for(let i=0;i<tmp.length;i++){
          this.topic_list.push('Topic '+tmp[i]["t_id"]);
          this.topic_cnt.push(Number(tmp[i]["ques_cnt"]));
        }
        // for(let i=0;i<this.data3.length;i++){
        //   // console.log(this.data3[i]["match_id"]);
        //   this.matchid.push(this.data3[i]["match_id"]);
        //   if(this.data3[i]["runs_scored_low"]!=0){
        //     this.runs.push(this.data3[i]["runs_scored_low"]);
        //     this.colors.push("#008FFB");
        //   } else if(this.data3[i]["runs_scored_middle"]!=0){
        //     this.runs.push(this.data3[i]["runs_scored_middle"]);
        //     this.colors.push("#00E396");
        //   } else{
        //     this.runs.push(this.data3[i]["runs_scored_high"]);
        //     this.colors.push("#FEB019");
        //   }
        // }
        // for(let i=0;i<this.data5.length;i++){
        //   this.matchid1.push(this.data5[i]["match_id"]);
        //   this.runs1.push(this.data5[i]["runs"]);
        //   this.wickets1.push(this.data5[i]["wickets"]);
        // }
        this.chartOptions.series = [
          {
            name: 'CPI Distribution',
            data: this.cpi_list
          }
        ];
        this.chartOptions2.series = this.depl_list_cnt;
        this.chartOptions2.labels = this.dep_list;

        this.chartOptions3.series = this.year_cnt;
        this.chartOptions3.labels = this.year_list;

        this.chartOptions4.series = this.topic_cnt;
        this.chartOptions4.labels = this.topic_list;
        //console.log(this.chartOptions3);
        // this.chartOptions1.series = [
        //   {
        //     name: "Runs",
        //     type: "column",
        //     data: this.runs1
        //   },
        //   {
        //     name: "Wickets",
        //     type: "line",
        //     data: this.wickets1
        //   }
        // ];
        // this.chartOptions1.labels = this.matchid1;
      })
    });
  }

}
