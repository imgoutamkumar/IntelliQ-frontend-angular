import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionCardComponent } from '../../components/question-card/question-card.component';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [QuestionCardComponent, MatProgressSpinnerModule, CommonModule],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss',
})
export class ExamComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private examService: ExamService
  ) {}
  ngOnInit(): void {
    this.getExamsQuestion();
  }
  Questions: any;
  getExamsQuestion() {
    this.activatedRoute.params.subscribe({
      next: (value: any) => {
        // console.log(value);
        //  console.log(value.quizId);
        this.examService.startExam(value.quizId).subscribe({
          next: (result: any) => {
            // console.log(result);
            this.Questions = result;
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
