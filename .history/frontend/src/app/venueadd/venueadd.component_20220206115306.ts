import { FormControl,FormGroup } from '@angular/forms';
import { Form } from './form';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-venueadd',
  templateUrl: './venueadd.component.html',
  styleUrls: ['./venueadd.component.css']
})
export class VenueaddComponent implements OnInit {

  data: Form | any;
  msg:any;
  empForm = new FormGroup({
    venue_name: new FormControl(''),
    country_name: new FormControl(''),
    city_name: new FormControl(''),
    capacity: new FormControl(''),
  });

  constructor(private api:ApiService,private http:HttpClient) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.api.postreq(this.empForm.value).subscribe(res=>{
      console.log(res);
    });
    this.empForm.reset();
  }

}


