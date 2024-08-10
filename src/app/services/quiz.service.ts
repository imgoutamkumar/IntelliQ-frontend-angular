import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://intelliq-backend-node.onrender.com';

  getAllPublishedQuiz(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/quiz/allPublishedQuiz`);
  }
}
