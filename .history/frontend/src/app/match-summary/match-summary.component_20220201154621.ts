import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SummaryService } from './summary.service';

@Component({
  selector: 'app-match-summary',
  templateUrl: './match-summary.component.html',
  styleUrls: ['./match-summary.component.css']
})
export class MatchSummaryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private details:SummaryService, private router: Router) { }
  i1_out1: any;
  i1_out2: any;
  i1_out3: any;
  i1_out4: any;
  i2_out1: any;
  i2_out2: any;
  i2_out3: any;
  i2_out4: any;
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const matchIdFromRoute = Number(routeParams.get('matchId'));
    this.details.getData_i1_batsum(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      var out1 =[];
      var out2 =[];
      for(let i=0; i<3; i++) {
        if(i>=data.length) {
          out1.push("");
          out2.push("");
        }
        else {
          out1.push(data[i].player_name);
          out2.push(data[i].runs+"("+data[i].balls+")");
      }
    }
    this.i1_out1 = out1;
    this.i1_out2 = out2;
    })
    this.details.getData_i2_batsum(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      var out1 =[];
      var out2 =[];
      for(let i=0; i<3; i++) {
        if(i>=data.length) {
          out1.push("");
          out2.push("");
        }
        else {
          out1.push(data[i].player_name);
          out2.push(data[i].runs+"("+data[i].balls+")");
      }
    }
    this.i2_out1 = out1;
    this.i2_out2 = out2;
    })
    this.details.getData_i1_ballsum(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      var out1 =[];
      var out2 =[];
      for(let i=0; i<3; i++) {
        if(i>=data.length) {
          out1.push("");
          out2.push("");
        }
        else {
          out1.push(data[i].pname);
          out2.push(data[i].wckts+"-"+data[i].runs+"  "+data[i].overs+"."+data[i].balls+" overs");
      }
    }
    this.i1_out3 = out1;
    this.i1_out4 = out2;
    })
    this.details.getData_i2_ballsum(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      var out1 =[];
      var out2 =[];
      for(let i=0; i<3; i++) {
        if(i>=data.length) {
          out1.push("");
          out2.push("");
        }
        else {
          out1.push(data[i].pname);
          out2.push(data[i].wckts+"-"+data[i].runs+"  "+data[i].overs+"."+data[i].balls+" overs");
      }
    }
    this.i2_out3 = out1;
    this.i2_out4 = out2;
  })
  }

}
