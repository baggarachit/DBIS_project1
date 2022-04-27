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
import { VenueComponent } from './venue/venue.component';
import { GetvenuesService } from './venue/getvenues.service';
import { VenueDetailsComponent } from './venue-details/venue-details.component';
import { GetvenuedetailsService } from './venue-details/getvenuedetails.service';
import { PlayerComponent } from './player/player.component';
import { PoinstableComponent } from './poinstable/poinstable.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

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
    MatchSummaryComponent,
    VenueComponent,
    VenueDetailsComponent,
    PlayerComponent,
    PoinstableComponent
  ],
  providers: [ApiService, DetailsService, SummaryService, GetvenuesService, GetvenuedetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
