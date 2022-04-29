import { Component,ViewChild,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './api.service';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-ques-page',
  templateUrl: './ques-page.component.html',
  styleUrls: ['./ques-page.component.css']
})
export class QuesPageComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(private route:ActivatedRoute, private api:ApiService) {
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
