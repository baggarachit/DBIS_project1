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
    Difficulty: new FormControl(''),
    Duration: new FormControl(''),
    Marks: new FormControl(''),
    Topics: new FormControl(''),
  });
  onSubmit(){
    this.api.get_paper(this.empForm.value).subscribe(res=>{
      console.log(res);
    });
    this.empForm.reset();
  }

}
