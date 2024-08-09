import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { ExamComponent } from './pages/exam/exam.component';
import { ResultComponent } from './pages/result/result.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
  {
    path: 'signIn',
    component: SignInComponent,
  },
  {
    path: 'exam/:quizId',
    component: ExamComponent,
  },
  {
    path: 'result/:resultId',
    component: ResultComponent,
  },
];
