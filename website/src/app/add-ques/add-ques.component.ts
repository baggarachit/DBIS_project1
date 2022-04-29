import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from '../global';
import { ApiService } from './api.service';

@Component({
  selector: 'app-add-ques',
  templateUrl: './add-ques.component.html',
  styleUrls: ['./add-ques.component.css']
})
export class AddQuesComponent implements OnInit {
  isstudent = GlobalConstants.isonlystudent;

  constructor(private api: ApiService,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  empForm = new FormGroup({
    Question: new FormControl(''),
    Expected_Difficulty: new FormControl(''),
    Expected_solve_time: new FormControl(''),
    Sub_topics: new FormControl(''),
  });
  onSubmit(){
    this.api.postreq(this.empForm.value).subscribe(res=>{
      console.log(res["result"]);
    });
    this.empForm.reset();
  }

}
