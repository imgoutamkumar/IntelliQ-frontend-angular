import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:3000';

  getAllPublishedQuiz(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/quiz/allPublishedQuiz`);
  }
}
