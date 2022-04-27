import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MatchComponent } from './match/match.component';

const routes : Routes = [  { path: '', component: AppComponent }, { path: 'match', component: MatchComponent }];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})

export class AppRoutingModule { }
