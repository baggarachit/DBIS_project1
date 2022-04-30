import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup, FormControl, Validators} from '@angular/forms';
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
interface drop_option {
  value: string;
  viewValue: string;
}
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
export type ChartOptionsnew = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
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
  public chartOptionsnew: Partial<ChartOptionsnew> | any;
  
  onSelectEvent(value: any){
    this.analytic_option = value;
  }

  public drop_options: drop_option[] = [
    {value: '1', viewValue: 'CPI-Student Distribution'},
    {value: '2', viewValue: 'Department-Student Distribution'},
    {value: '3', viewValue: 'Year-Student Distribution'},
    {value: '4', viewValue: 'Topic-Question Distribution'},
  ];
  analytic_option:string="1";
  cpi_list: Array<any> = [];
  dep_list: Array<any> = [];
  depl_list_cnt: Array<any> = [];
  year_list: Array<any> = [];
  year_cnt: Array<any> = [];
  topic_list: Array<any> = [];
  topic_cnt: Array<any> = [];

  constructor(private api:ApiService,private route: ActivatedRoute){
    this.chartOptionsnew = {
      series: [75],
      chart: {
        height: 350,
        type: "radialBar",
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function(val:any) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Percent"]
    };
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
      })
    });
  }

}
