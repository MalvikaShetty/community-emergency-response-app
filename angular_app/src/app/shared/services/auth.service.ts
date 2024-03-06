import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'https://localhost:44334/api/auth'; 
  
  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400 && error.error.message === 'Email is already registered') {
            // Handle the specific error message here
            return throwError('Email is already registered');
          } else {
            // For other errors, rethrow the error
            return throwError(error);
          }
        })
      );
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400 && error.error.message === 'Username or password is incorrect') {
            // Handle the specific error message here
            return throwError('Username or password is incorrect');
          } else {
            // For other errors, rethrow the error
            return throwError(error);
          }
        })
      );
  }

}
