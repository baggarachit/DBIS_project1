import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-exam-page',
  templateUrl: './exam-page.component.html',
  styleUrls: ['./exam-page.component.css']
})
export class ExamPageComponent implements OnInit {

  constructor(private api: ApiService,private route: ActivatedRoute) { }
  data:any;
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const examIdFromRoute = Number(routeParams.get('e_id'));
    this.api.getData_0(examIdFromRoute).subscribe(data=>{
      console.log(data);
      this.data = data;
    })
  }

}
