import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetvenuesService } from './getvenues.service';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit {

  constructor(private route: ActivatedRoute, private details:GetvenuesService, private router: Router) { }
  data_venues: any;
  ngOnInit(): void {
    this.details.getData_venues().subscribe(data=>{
      console.log(data);
      this.data_venues = data;
    })
  }

}
