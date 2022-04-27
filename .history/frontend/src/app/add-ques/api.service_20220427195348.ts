import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  empForm = new FormGroup({
    Question: new FormControl(''),
    Expected_Difficulty: new FormControl(''),
    Expected_solve_time: new FormControl(''),
    Sub_topics: new FormControl(''),
  });
  onSubmit(){}
}
