import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { InputModalityDetector } from '@angular/cdk/a11y';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../services/exam.service';

export interface submittedData {
  quizId: '';
  submitted_answers: number[];
}

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [MatRadioModule, CommonModule, FormsModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss',
})
export class QuestionCardComponent implements OnInit {
  @Input() questionsData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private examService: ExamService,
    private route: Router
  ) {}
  time: number = 0;
  ngOnInit(): void {
    // console.log('this.questionsData : ', this.questionsData);
    this.time = this.questionsData.questions_list[this.currentQuestion]?.timer;
    // this.Timer();
    this.submitted_answers = Array(
      this.questionsData.questions_list.length
    ).fill(0);
  }
  currentQuestion: number = 0;
  submitted_answers: number[] = [];

  isNextDiasabled = false;
  isSubmitDiasabled = true;
  nextQuestion() {
    this.currentQuestion += 1;
    console.log('currentQuestion : ', this.currentQuestion);
    if (this.currentQuestion === this.questionsData.questions_list.length - 1) {
      this.isNextDiasabled = true;
      this.isSubmitDiasabled = false;
    }
    this.time = this.questionsData.questions_list[this.currentQuestion]?.timer;
    // this.Timer();
  }

  /*  Timer() {
    let t: any = setInterval(() => {
      if (this.time <= 0) {
        clearInterval(t);
        this.nextQuestion();
      } else {
        this.time--;
      }
    }, 1000);
  } */

  T = setInterval(() => {
    if (this.time == null || undefined) {
      console.log(this.time);
      // clearInterval(t);
      this.submitExam();
      clearInterval(this.T);
    } else {
      if (this.time == 0) {
        if (
          this.currentQuestion ===
          this.questionsData.questions_list.length - 1
        ) {
          clearInterval(this.T);
          this.submitExam();
        }
        if (
          !(
            this.currentQuestion ===
            this.questionsData.questions_list.length - 1
          )
        ) {
          console.log('nextQuestion function called');
          this.nextQuestion();
        }
      } else {
        this.time--;
      }
    }
  }, 1000);

  /*  Timer() {
    let t: any = setInterval(() => {
      if (this.time == null || undefined) {
        console.log(this.time);
        clearInterval(t);
        this.submitExam();
      } else {
        if (this.time == 0) {
          this.nextQuestion();
        } else {
          this.time--;
        }
      }
    }, 1000);
  } */

  getFormattedTime() {
    let mm = Math.floor(this.time / 60);
    let ss = this.time - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  subAnswers: submittedData = {
    quizId: '',
    submitted_answers: [],
  };
  submitExam() {
    console.log('submitExam called');
    clearInterval(this.T);
    this.subAnswers.quizId = this.questionsData._id;
    this.subAnswers.submitted_answers = this.submitted_answers;
    /*  console.log('subAnswers.quizId', this.subAnswers.quizId);
    console.log(
      'subAnswers.submitted_answers',
      this.subAnswers.submitted_answers
    ); */

    this.examService.submitExam(this.subAnswers).subscribe({
      next: (result: any) => {
        this.route.navigate(['/result/', result._id]);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
