import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, ChartType, registerables } from 'chart.js';
import { GetvenuedetailsService } from './getvenuedetails.service';

@Component({
  selector: 'app-venue-details',
  templateUrl: './venue-details.component.html',
  styleUrls: ['./venue-details.component.css']
})
export class VenueDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private details:GetvenuedetailsService, private router: Router) { 
    Chart.register(...registerables);
  }
  p: ChartType = "pie";
  pieChart1: any;
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
      console.log(data[0].bat_first, data[0].ball_first);
      this.data_pie = data;
      var labels =  ["Team batting 1st won", "Team batting 2nd won"];

      const dataa = {
        labels: labels,
        datasets: [{
          label: 'outline',
          data: [data[0].bat_first, data[0].ball_first],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
          ],
          hoverOffset: 4
        },
      ]
      };
    
      const config = {
        type: this.p,
        data: dataa,
        // options: {
        //   maintainAspectRatio: false,
        // }
      };
      this.pieChart1 = new Chart("pie1", config);
    })
  }

}
