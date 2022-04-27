import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetvenuedetailsService } from './getvenuedetails.service';

@Component({
  selector: 'app-venue-details',
  templateUrl: './venue-details.component.html',
  styleUrls: ['./venue-details.component.css']
})
export class VenueDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private details:GetvenuedetailsService, private router: Router) { }
  data_venuedet: any;
  data_pie: any;
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const venueIdFromRoute = Number(routeParams.get('venueId'));
    this.details.getData_venuedet(venueIdFromRoute).subscribe(data=>{
      // console.log(data);
      this.data_venuedet = data;
    })
    this.details.getData_venuepie(venueIdFromRoute).subscribe(data=>{
      console.log(data);
      this.data_pie = data;
    })
  }

}
