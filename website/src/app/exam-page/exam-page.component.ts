import { Component, ViewChild,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './api.service';
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
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
};
@Component({
  selector: 'app-exam-page',
  templateUrl: './exam-page.component.html',
  styleUrls: ['./exam-page.component.css']
})
export class ExamPageComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions2> | any;
  role:any;
  diff: Array<any> = [];
  diff_cnt: Array<any> = [];
  scatter: Array<any> = [];

  constructor(private api: ApiService,private route: ActivatedRoute) { 
    this.chartOptions = {
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
    this.chartOptions2 = {
      series: [{
        name: "SAMPLE C",
        data: [
        [21.7, 3], [23.6, 3.5], [24.6, 3], [29.9, 3], [21.7, 20], [23, 2], [10.9, 3], [28, 4], [27.1, 0.3], [16.4, 4], [13.6, 0], [19, 5], [22.4, 3], [24.5, 3], [32.6, 3], [27.1, 4], [29.6, 6], [31.6, 8], [21.6, 5], [20.9, 4], [22.4, 0], [32.6, 10.3], [29.7, 20.8], [24.5, 0.8], [21.4, 0], [21.7, 6.9], [28.6, 7.7], [15.4, 0], [18.1, 0], [33.4, 0], [16.4, 0]]
      }],
      chart: {
        height: 350,
        type: 'scatter',
        zoom: {
          enabled: true,
          type: 'xy'
        }
      },
      xaxis: {
        tickAmount: 5,
        labels: {
          formatter: function(val:any) {
            return parseFloat(val).toFixed(1)
          }
        },
        title:{
          text: 'Difficulty'
        }
      },
      yaxis: {
        tickAmount: 7,
        title:{
          text: 'Time taken'
        }
      },

    };
  }
  data:any;
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    const routeParams = this.route.snapshot.paramMap;
    const examIdFromRoute = Number(routeParams.get('e_id'));
    this.api.getData_0(examIdFromRoute).subscribe(data=>{
      console.log(data);
      this.data = data;
    })
    this.api.getData_1(examIdFromRoute).subscribe(data=>{
      console.log(data);
      var tmp = data["difficulty"];
      for (let i=0;i<tmp.length;i++){
        this.diff.push(tmp[i]["difficulty"]);
        this.diff_cnt.push(Number(tmp[i]["count"]));
      }
      var tmp = data["time"];
      for (let i=0;i<tmp.length;i++){
        this.scatter.push([tmp[i]["difficulty"],tmp[i]["time_taken"]]);
      }
      this.chartOptions.series = this.diff_cnt;
      this.chartOptions.labels = this.diff;
      this.chartOptions2.series = [{
        name: "scatter",
        data: this.scatter
      }]
      console.log(this.chartOptions2);
    })
  }

}
