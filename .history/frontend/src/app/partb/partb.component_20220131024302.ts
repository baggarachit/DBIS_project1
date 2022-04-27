import { Component, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

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
      console.log('haha');
      this.response$ = this.http.get('http://localhost:3080/').pipe(shareReplay(1));
      console.log(this.response$);
  }

}
