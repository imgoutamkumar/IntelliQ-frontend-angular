import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://intelliq-backend-node.onrender.com';
  // baseUrl = 'https://intelliq-backend-node.onrender.com';
  register(signUpFormData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, signUpFormData);
  }
  signIn(signInFormData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, signInFormData);
  }
}
