import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-ques-page',
  templateUrl: './ques-page.component.html',
  styleUrls: ['./ques-page.component.css']
})
export class QuesPageComponent implements OnInit {

  constructor(private route:ActivatedRoute, private api:ApiService) { }
  data: any;
  st_st: any = new Set();
  t_st: any = new Set();
  subtp: string="";
  tp:string="";
  feedback_given: boolean = false;
  role!: string|null;
  isprof!: boolean|null;

  ngOnInit(): void {
    this.role=localStorage.getItem('role');
    if(this.role=='student') this.isprof=false;
    else this.isprof=true;
    console.log("wtfffffffffffffffffffffffffffffffffffffffffffff")
    console.log(this.isprof);
    const routeParams = this.route.snapshot.paramMap;
    const quesIdFromRoute = Number(routeParams.get('q_id'));
    this.api.getData_0(quesIdFromRoute).subscribe(data=>{
      console.log(data);
      this.data = data;
      for(var i=0; i<data.length;i++){
        var osz=this.st_st.size;
        this.st_st.add(data[i].st_id);
        if(osz!=this.st_st.size) this.subtp = this.subtp +"Subtopic "+String(data[i].st_id)+", ";
        osz=this.t_st.size;
        this.t_st.add(data[i].t_id);
        if(osz!=this.t_st.size) this.tp = this.tp +"Topic "+String(data[i].t_id)+", ";
      }
      console.log("wowowow");
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
    Question: new FormControl(''),
    Expected_Difficulty: new FormControl(''),
    Expected_solve_time: new FormControl(''),
    Sub_topics: new FormControl(''),
  });
  onSubmit(){}

}
