import { Component, OnInit } from '@angular/core';
import { QuizCardComponent } from '../../components/quiz-card/quiz-card.component';
import { Router, RouterLink } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    QuizCardComponent,
    MatProgressSpinnerModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private route: Router, private quizService: QuizService) {}
  ngOnInit(): void {
    this.getAllPublishedQuiz();
  }
  navigateToSignIn() {
    this.route.navigate(['/signIn']);
  }

  allQuizzes: any;
  getAllPublishedQuiz() {
    this.quizService.getAllPublishedQuiz().subscribe({
      next: (result: any) => {
        console.log(result);
        this.allQuizzes = result;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
