import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private baseUrl = 'https://localhost:7149/api/reports';

  constructor(private http: HttpClient) { }

  getSlaReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/sla`);
  }

  getAgentPerformance(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/agent-performance`);
  }

  getTicketAging(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ticket-aging`);
  }
}
