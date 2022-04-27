import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-ques',
  templateUrl: './add-ques.component.html',
  styleUrls: ['./add-ques.component.css']
})
export class AddQuesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  empForm = new FormGroup({
    Question: new FormControl(''),
    Expected_Difficulty: new FormControl(''),
    Expected_solve_time: new FormControl(''),
    Sub_topics: new FormControl(''),
  });
  onSubmit(){}

}
