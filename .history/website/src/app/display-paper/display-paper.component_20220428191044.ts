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

  ngOnInit(): void {
    const routeParams = this.route.snapshot.queryParamMap;
    const cid = Number(routeParams.get('course'));
    const diff = Number(routeParams.get('difficulty'));
    const dur = Number(routeParams.get('duration'));
    const marks = Number(routeParams.get('marks'));
    const topics = Number(routeParams.get('topics'));
    // this.c_id = courseIdFromRoute;
    this.api.getData_0(cid).subscribe(data=>{
      console.log(data);
      // this.data = data;
    })
  }

}
