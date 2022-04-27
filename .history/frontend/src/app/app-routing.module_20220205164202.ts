import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { MatchSummaryComponent } from './match-summary/match-summary.component';
import { MatchComponent } from './match/match.component';
import { PlayerComponent } from './player/player.component';
import { PoinstableComponent } from './poinstable/poinstable.component';
import { VenueDetailsComponent } from './venue-details/venue-details.component';
import { VenueComponent } from './venue/venue.component';

const routes : Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'matches', component: MatchComponent }, 
  { path: 'matches/:matchId', component: MatchDetailsComponent },
  { path: 'matches/:matchId/summary', component:  MatchSummaryComponent },
  { path: 'venues', component:  VenueComponent },
  { path: 'venue/add', component: VenueComponent},
  { path: 'venue/:venueId', component: VenueDetailsComponent },
  { path: 'player/:player_id', component: PlayerComponent},
  { path: 'pointstable/:year', component: PoinstableComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})

export class AppRoutingModule { }
