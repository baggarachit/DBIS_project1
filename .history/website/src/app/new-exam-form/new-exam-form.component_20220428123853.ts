import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-exam-form',
  templateUrl: './new-exam-form.component.html',
  styleUrls: ['./new-exam-form.component.css']
})
export class NewExamFormComponent implements OnInit {

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
