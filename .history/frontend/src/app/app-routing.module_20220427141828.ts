import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursePageComponent } from './course-page/course-page.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { MatchSummaryComponent } from './match-summary/match-summary.component';
import { MatchComponent } from './match/match.component';
import { PlayerComponent } from './player/player.component';
import { PoinstableComponent } from './poinstable/poinstable.component';
import { PtlandComponent } from './ptland/ptland.component';
import { VenueDetailsComponent } from './venue-details/venue-details.component';
import { VenueComponent } from './venue/venue.component';
import { VenueaddComponent } from './venueadd/venueadd.component';

const routes : Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'home', component: HomeComponent, canActivate : [AuthGuard] }, 
  { path: 'course/:c_id', component: CoursePageComponent, canActivate : [AuthGuard]  },
  { path: 'matches', component: MatchComponent, canActivate : [AuthGuard]  }, 
  { path: 'matches/:matchId', component: MatchDetailsComponent, canActivate : [AuthGuard] },
  { path: 'matches/:matchId/summary', component:  MatchSummaryComponent, canActivate : [AuthGuard] },
  { path: 'venues', component:  VenueComponent, canActivate : [AuthGuard]  },
  { path: 'venue/add', component: VenueaddComponent, canActivate : [AuthGuard] },
  { path: 'venue/:venueId', component: VenueDetailsComponent, canActivate : [AuthGuard] },
  { path: 'pointstable', component: PtlandComponent, canActivate : [AuthGuard] },
  { path: 'players/:player_id', component: PlayerComponent, canActivate : [AuthGuard]},
  { path: 'pointstable/:year', component: PoinstableComponent, canActivate : [AuthGuard]},
  { path: '**',   redirectTo: '/home', pathMatch: 'full' },];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})

export class AppRoutingModule { }
