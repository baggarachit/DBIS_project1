import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { MatchSummaryComponent } from './match-summary/match-summary.component';
import { MatchComponent } from './match/match.component';
import { VenueDetailsComponent } from './venue-details/venue-details.component';
import { VenueComponent } from './venue/venue.component';

const routes : Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'match', component: MatchComponent }, 
  { path: 'match/:matchId', component: MatchDetailsComponent },
  { path: 'match/:matchId/summary', component:  MatchSummaryComponent },
  { path: 'venues', component:  VenueComponent },
  { path: 'venue/:venueId', component: VenueDetailsComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})

export class AppRoutingModule { }
