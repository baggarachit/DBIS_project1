import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { MatchComponent } from './match/match.component';

const routes : Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'match', component: MatchComponent }, 
  { path: 'match/:matchId', component: MatchDetailsComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})

export class AppRoutingModule { }
