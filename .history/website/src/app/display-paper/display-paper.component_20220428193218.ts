import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { ApiService } from './api.service';

@Component({
  selector: 'app-display-paper',
  templateUrl: './display-paper.component.html',
  styleUrls: ['./display-paper.component.css']
})
export class DisplayPaperComponent implements OnInit {

  constructor(private router: Router, private api: ApiService, private route: ActivatedRoute) { }
  data: any;
  cid: any;
  diff: any;
  dur: any;
  marks: any;
  topics: any;
  ngOnInit(): void {
    const routeParams = this.route.snapshot.queryParamMap;
    // this.cid = Number(routeParams.get('course'));
    // this.diff = Number(routeParams.get('difficulty'));
    // this.dur = Number(routeParams.get('duration'));
    // this.marks = Number(routeParams.get('marks'));
    // this.topics = Number(routeParams.get('topics'));
    // this.c_id = courseIdFromRoute;
    this.api.get_paper(this.cid,this.diff,this.dur,this.marks,this.topics).subscribe(data=>{
      console.log(data);
      this.data = data;
    })
  }

}
