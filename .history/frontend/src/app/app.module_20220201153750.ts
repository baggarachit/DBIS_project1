import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatchComponent } from './match/match.component';
import { ApiService } from './match/api.service';
import { HomeComponent } from './home/home.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { DetailsService } from './match-details/details.service';
import { MatchSummaryComponent } from './match-summary/match-summary.component';
import { SummaryService } from './match-summary/summary.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    MatchComponent,
    HomeComponent,
    MatchDetailsComponent,
    MatchSummaryComponent
  ],
  providers: [ApiService, DetailsService, SummaryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
