import { Component,ViewChild,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './api.service';
interface drop_option {
  value: string;
  viewValue: string;
}
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexLegend,
  ApexResponsive,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};
export type ChartOptions2 = {
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
export type ChartOptions3 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-ques-page',
  templateUrl: './ques-page.component.html',
  styleUrls: ['./ques-page.component.css']
})
export class QuesPageComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions2> | any;
  public chartOptions3: Partial<ChartOptions3> | any;
  onSelectEvent(value: any){
    this.analytic_option = value;
  }
  public drop_options: drop_option[] = [
    {value: '1', viewValue: 'Percentage of Students solved currently'},
    {value: '2', viewValue: 'CPI Wise solved distribution'},
    {value: '3', viewValue: 'Department wise Solved Distribution'},
  ];
  analytic_option:string="1";
  arr1: Array<any> = [];
  dep_list: Array<any> = [];
  depl_list_cnt: Array<any> = [];
  constructor(private route:ActivatedRoute, private api:ApiService, private router: Router) {
    this.chartOptions3 = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 480,
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
    this.chartOptions = {
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

    this.chartOptions2 = {
      series: [
        {
          name: "distibuted",
          data: [21, 22, 10, 28, 16, 21, 13, 30]
        }
      ],
      chart: {
        height: 350,
        type: "bar",
      },
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
        categories: [
          "5",
          "6",
          "7",
          "8",
          "9",
        ],
        labels: {
          style: {
            fontSize: "12px"
          }
        }
      }
    };

   }
  data: any;
  st_st: any = new Set();
  t_st: any = new Set();
  subtp: string="";
  tp:string="";
  feedback_given: boolean = false;
  role!: string|null;
  isprof!: boolean|null;
  appeared: any;

  ngOnInit(){
    this.role=localStorage.getItem('role');
    if(this.role=='student') this.isprof=false;
    else this.isprof=true;
    // console.log("wtfffffffffffffffffffffffffffffffffffffffffffff")
    console.log(this.isprof);
    const routeParams = this.route.snapshot.paramMap;
    const quesIdFromRoute = Number(routeParams.get('q_id'));
    this.api.getData_0(quesIdFromRoute).subscribe(data=>{
      console.log(data);
      this.appeared= data["data2"][0]["count"];
      data=data["data1"];
      this.data = data;
      for(var i=0; i<data.length;i++){
        var osz=this.st_st.size;
        this.st_st.add(data[i].st_id);
        if(osz!=this.st_st.size) this.subtp = this.subtp +"Subtopic "+String(data[i].st_id)+", ";
        osz=this.t_st.size;
        this.t_st.add(data[i].t_id);
        if(osz!=this.t_st.size) this.tp = this.tp +"Topic "+String(data[i].t_id)+", ";
      }
      // console.log("wowowow");
      console.log(this.subtp);
      this.subtp = this.subtp.slice(0,-2);
      this.tp = this.tp.slice(0,-2);
    })
    this.api.getData_00(quesIdFromRoute).subscribe(data=>{
      console.log(data);
      this.chartOptions.series = [Math.round(data["percent_solve"])];
      var tmp = data["cpi_solved"][0];
      console.log(tmp);
      this.arr1.push(tmp["five"]);
      this.arr1.push(tmp["six"]);
      this.arr1.push(tmp["seven"]);
      this.arr1.push(tmp["eight"]);
      this.arr1.push(tmp["nine"]);
      this.chartOptions2.series = [
        {
          name: "distibuted",
          data: this.arr1
        }
      ]
      var tmp = data["dept_solved"];
      console.log(tmp);
      for(let i=0;i<tmp.length;i++){
        this.dep_list.push(tmp[i]["department"]);
        this.depl_list_cnt.push(Number(tmp[i]["count"]));
      }
      console.log(this.dep_list);
      this.chartOptions3.series = this.depl_list_cnt;
      this.chartOptions3.labels = this.dep_list;
    });
    var uid=localStorage.getItem('token');
    this.api.getData_1(uid,quesIdFromRoute).subscribe(data=>{
      // console.log("wohoooo");
      console.log(data);
      if(data.length != 0) this.feedback_given=true;
    })
  }
  empForm = new FormGroup({
    Difficulty_faced: new FormControl(''),
    Time_taken: new FormControl(''),
    solved: new FormControl(''),
  });
  onSubmit(){
    this.api.postreq(this.empForm.value, this.data[0].q_id, localStorage.getItem('token')).subscribe(res=>{
      console.log(res["result"]);
      // maybe insert window alert if invalid subtopic;
      if(res["result"]=="error invalid subtopic"){
        alert("invalid subtopic");
       
      }
 
    });
    this.empForm.reset();
    this.feedback_given=true;
    
  }

}
