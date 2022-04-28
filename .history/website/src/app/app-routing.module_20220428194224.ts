import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddQuesComponent } from './add-ques/add-ques.component';
import { CoursePageComponent } from './course-page/course-page.component';
// import { DisplayPaperComponent } from './display-paper/display-paper.component';
import { ExamPageComponent } from './exam-page/exam-page.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { MatchSummaryComponent } from './match-summary/match-summary.component';
import { MatchComponent } from './match/match.component';
import { NewExamFormComponent } from './new-exam-form/new-exam-form.component';
import { PlayerComponent } from './player/player.component';
import { PoinstableComponent } from './poinstable/poinstable.component';
import { PtlandComponent } from './ptland/ptland.component';
import { QuesPageComponent } from './ques-page/ques-page.component';
import { VenueDetailsComponent } from './venue-details/venue-details.component';
import { VenueComponent } from './venue/venue.component';
import { VenueaddComponent } from './venueadd/venueadd.component';

const routes : Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'home', component: HomeComponent, canActivate : [AuthGuard] }, 
  { path: ':c_id/new-exam-form', component: NewExamFormComponent, canActivate : [AuthGuard]  },
  // { path: 'display-paper', component: DisplayPaperComponent, canActivate : [AuthGuard]  },
  { path: 'ques/add', component: AddQuesComponent, canActivate : [AuthGuard]  },
  { path: 'course/:c_id', component: CoursePageComponent, canActivate : [AuthGuard]  },
  { path: 'exam/:e_id', component: ExamPageComponent, canActivate : [AuthGuard]  },
  { path: 'ques/:q_id', component: QuesPageComponent, canActivate : [AuthGuard]  },
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
