import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './details.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private details:DetailsService) { }
  headers_bat = ["Batter",  "Balls faced", "Runs", "fours", "sixes"];
  headers_ball = ["Bowler", "Balls Bowled", "Runs Given", "Wickets"];
  headers_match_info = ["Match ID", "team1_name", "team2_name", "toss_winner","Opted","Year", "Venue"]
  data_bat1: any; 
  data_bat2: any; 
  data_ball1: any; 
  data_ball2: any; 
  data_info: any;
  data_ump: any;
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const matchIdFromRoute = Number(routeParams.get('matchId'));
    this.details.getData_bat1(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_bat1 = data;
    })
    this.details.getData_bat2(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_bat2 = data;
    })
    this.details.getData_ball1(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_ball1 = data;
    })
    this.details.getData_ball2(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_ball2 = data;
    })
    this.details.getData_info(matchIdFromRoute).subscribe(data=>{
      console.log(data);
      this.data_info = data;
    })
    this.details.getData_ump(matchIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_ump = data;
    })
    
  }

}
