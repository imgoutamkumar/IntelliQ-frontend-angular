import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-result',
  standalone: true,
  imports: [MatProgressSpinnerModule, RouterLink, MatButtonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.getResult();
  }

  result: any;
  getResult() {
    this.activatedRoute.paramMap.subscribe({
      next: (value: any) => {
        console.log(value.params.resultId);
        const resultId = value.params.resultId;
        this.examService.getResult(resultId.toString()).subscribe({
          next: (result: any) => {
            this.result = result;
            console.log(this.result);
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      },
    });
  }
}
