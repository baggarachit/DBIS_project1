import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-new-exam-form',
  templateUrl: './new-exam-form.component.html',
  styleUrls: ['./new-exam-form.component.css']
})
export class NewExamFormComponent implements OnInit {

  constructor(private api:ApiService, private route: ActivatedRoute, private router: Router) { }
 c_id: any;
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const courseIdFromRoute = Number(routeParams.get('c_id'));
    this.c_id = courseIdFromRoute;
  }
  empForm = new FormGroup({
    Difficulty: new FormControl(''),
    Duration: new FormControl(''),
    Marks: new FormControl(''),
    Topics: new FormControl(''),
  });
  onSubmit(){
    this.router.navigate(['/display-paper'],{ queryParams: { course: this.c_id, difficulty: this.empForm.value.Difficulty, duration: this.empForm.value.Duration, marks: this.empForm.value.Marks, topics: this.empForm.value.Topics}});
    // this.api.get_paper(this.empForm.value, this.c_id).subscribe(res=>{
    //   console.log(res);

    // });
    this.empForm.reset();
  }

}
