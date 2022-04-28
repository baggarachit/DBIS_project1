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
import { NgApexchartsModule } from "ng-apexcharts";
import { VenueaddComponent } from './venueadd/venueadd.component';
import { PtlandComponent } from './ptland/ptland.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import {MatGridListModule} from '@angular/material/grid-list';
import { CoursePageComponent } from './course-page/course-page.component';
import { ExamPageComponent } from './exam-page/exam-page.component';
import { QuesPageComponent } from './ques-page/ques-page.component';
import { AddQuesComponent } from './add-ques/add-ques.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    MatGridListModule,
    MatButtonModule,
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
    PoinstableComponent,
    VenueaddComponent,
    PtlandComponent,
    LoginComponent,
    CoursePageComponent,
    ExamPageComponent,
    QuesPageComponent,
    AddQuesComponent
  ],
  providers: [AuthGuard, ApiService, DetailsService, SummaryService, GetvenuesService, GetvenuedetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
