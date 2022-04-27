import { Component, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs';

@Component({
  selector: 'app-partb',
  templateUrl: './partb.component.html',
  styleUrls: ['./partb.component.css']
})
export class PartbComponent implements OnInit {
  response$: any;
  http: any;

  constructor() { }

  ngOnInit(): void {
      this.response$ = this.http.get('http://localhost:3800/').pipe(shareReplay(1));
      console.log(this.response$);
  }

}
