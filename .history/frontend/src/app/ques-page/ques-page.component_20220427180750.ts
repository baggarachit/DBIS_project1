import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const quesIdFromRoute = Number(routeParams.get('q_id'));
    this.api.getData_0(quesIdFromRoute).subscribe(data=>{
      console.log(data);
      this.data = data;

      for()
    })
  }

}
