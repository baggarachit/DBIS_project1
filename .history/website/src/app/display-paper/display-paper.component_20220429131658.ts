import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-display-paper',
  templateUrl: './display-paper.component.html',
  styleUrls: ['./display-paper.component.css']
})
export class DisplayPaperComponent implements OnInit {

  constructor(private api: ApiService,private router: Router) {}
  params = this.router.getCurrentNavigation()?.extras.state;
  data : any;
  ngOnInit(): void {
    console.log(this.params);
    // console.log(this.params.id);
    this.api.getpaper(this.params).subscribe(data=>{
      console.log("dsfadf");
      console.log(data['ques_list']);
      this.data = data;
   })
  }

}
