import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddQuesComponent } from './add-ques/add-ques.component';
import { CourseAnalyticsComponent } from './course-analytics/course-analytics.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { DisplayPaperComponent } from './display-paper/display-paper.component';
import { ExamPageComponent } from './exam-page/exam-page.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { NewExamFormComponent } from './new-exam-form/new-exam-form.component';

import { QuesPageComponent } from './ques-page/ques-page.component';



const routes : Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'home', component: HomeComponent, canActivate : [AuthGuard] }, 
  { path: ':c_id/new-exam-form', component: NewExamFormComponent, canActivate : [AuthGuard]  },
  { path: 'display-paper', component: DisplayPaperComponent, canActivate : [AuthGuard]  },
  { path: 'ques/add', component: AddQuesComponent, canActivate : [AuthGuard]  },
  { path: 'course/:c_id', component: CoursePageComponent, canActivate : [AuthGuard]  },
  { path: 'exam/:e_id', component: ExamPageComponent, canActivate : [AuthGuard]  },
  { path: 'ques/:q_id', component: QuesPageComponent, canActivate : [AuthGuard]  },

  { path: 'course/:c_id/analytics', component: CourseAnalyticsComponent , canActivate : [AuthGuard]},
  { path: '**',   redirectTo: '/home', pathMatch: 'full' },];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})

export class AppRoutingModule { }
