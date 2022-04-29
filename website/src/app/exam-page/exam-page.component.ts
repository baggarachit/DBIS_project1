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
@Component({
  selector: 'app-exam-page',
  templateUrl: './exam-page.component.html',
  styleUrls: ['./exam-page.component.css']
})
export class ExamPageComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;
  diff: Array<any> = [];
  diff_cnt: Array<any> = [];
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
  }
  data:any;
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const examIdFromRoute = Number(routeParams.get('e_id'));
    this.api.getData_0(examIdFromRoute).subscribe(data=>{
      console.log(data);
      this.data = data;
    })
    this.api.getData_1(examIdFromRoute).subscribe(data=>{
      console.log(data);
      for (let i=0;i<data.length;i++){
        this.diff.push(data[i]["difficulty"]);
        this.diff_cnt.push(Number(data[i]["count"]));
      }
      this.chartOptions.series = this.diff_cnt;
      this.chartOptions.labels = this.diff;
    })
  }

}
