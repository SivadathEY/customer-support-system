// src/app/services/ticket.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTicketRequest, TicketResponse, UpdateTicketStatusRequest } from '../models/tickets.models';
 
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  // TODO: CHECK YOUR BROWSER URL WHEN SWAGGER OPENS TO FIND THIS PORT
  private apiUrl = 'https://localhost:7284/api/Tickets';
 
  constructor(private http: HttpClient) { }
 
  // POST: /api/Tickets
  createTicket(request: CreateTicketRequest): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(this.apiUrl, request);
  }
 
  // GET: /api/Tickets/{id}
  getTicketById(id: string): Observable<TicketResponse> {
    return this.http.get<TicketResponse>(`${this.apiUrl}/${id}`);
  }
 
  // PUT: /api/Tickets/{id}/status
  updateStatus(id: string, request: UpdateTicketStatusRequest): Observable<TicketResponse> {
    return this.http.put<TicketResponse>(`${this.apiUrl}/${id}/status`, request);
  }
}
 