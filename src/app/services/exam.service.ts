import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private http: HttpClient, private cookie: CookieService) {}

  baseUrl = 'http://localhost:3000';

  //using localstorage
  /* headers = new HttpHeaders().set(
    'Authorization',
    `bearer ${localStorage.getItem('token')}`
  ); */

  //using cookie
  headers = new HttpHeaders().set(
    'Authorization',
    `bearer ${this.cookie.get('token')}`
  );

  startExam(quizId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/exam/${quizId}`, {
      headers: this.headers,
    });
  }
  submitExam(submittedData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/exam/`, submittedData, {
      headers: this.headers,
    });
  }
  getResult(resultId: string): Observable<any> {
    console.log('resultId : ', resultId);
    return this.http.get<any>(`${this.baseUrl}/result/${resultId}`, {
      headers: this.headers,
    });
  }
}
