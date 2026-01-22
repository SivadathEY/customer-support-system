// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
 
// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private baseUrl = 'http://localhost:7299/api/auth'; // TODO: set correctly
 
//   constructor(private http: HttpClient) {}
 
//   // POST: /api/auth/login
//   login(data: { email: string; password: string }): Observable<any> {
//     return this.http.post(`${this.baseUrl}/login`, data);
//   }
 
//   // Example of GET (for later)
//   me(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/me`);
//   }
 
//   // Example of PUT (for later)
//   updateProfile(payload: any): Observable<any> {
//     return this.http.put(`${this.baseUrl}/profile`, payload);
//   }
// }
 
 

// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
export interface RegisterPayload {
  email: string;
  password: string;
  // Do NOT include role; backend assigns CUSTOMER automatically
}
 
export interface LoginPayload {
  email: string;
  password: string;
}
 
@Injectable({ providedIn: 'root' })
export class AuthService {
  // Adjust if your actual API root is different
  private baseUrl = 'https://localhost:7299/api/auth';
 
  constructor(private http: HttpClient) {}
 
  register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, payload);
  }
 
  login(payload: LoginPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, payload);
  }

}