import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {

  constructor(private router: Router, private api: ApiService, private route: ActivatedRoute) { }
  data: any;
  
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const courseIdFromRoute = Number(routeParams.get('c_id'));
    this.api.getData_0(courseIdFromRoute).subscribe(data=>{
      console.log(data);
      this.data = data;
    })

}
new_exam(){
  // console.log("wi");
  // navigate.bind(this)
  this.router.navigate(['/new-exam-form']);  
}
}
