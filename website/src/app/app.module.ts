

import {MatNativeDateModule} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from "ng-apexcharts";
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import {MatGridListModule} from '@angular/material/grid-list';
import { CoursePageComponent } from './course-page/course-page.component';
import { ExamPageComponent } from './exam-page/exam-page.component';
import { QuesPageComponent } from './ques-page/ques-page.component';
import { AddQuesComponent } from './add-ques/add-ques.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewExamFormComponent } from './new-exam-form/new-exam-form.component';
import { DisplayPaperComponent } from './display-paper/display-paper.component';
import { CourseAnalyticsComponent } from './course-analytics/course-analytics.component';
// import { DisplayPaperComponent } from './display-paper/display-paper.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';


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
    MatIconModule,
    MatDividerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CoursePageComponent,
    ExamPageComponent,
    QuesPageComponent,
    AddQuesComponent,
    NewExamFormComponent,
    DisplayPaperComponent,
    CourseAnalyticsComponent,
    // DisplayPaperComponent
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
