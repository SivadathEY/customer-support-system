
// src/app/services/tickets.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketResponse, TicketStatus, CreateTicketRequest } from '../models/ticket.models';

export interface UpdateTicketStatusRequest {
  toStatus: TicketStatus;
  changedByUserId: string;
  reason?: string;
}

@Injectable({ providedIn: 'root' })
export class TicketsService {
  // RELATIVE base URL so dev proxy handles backend routing
  private readonly baseUrl = `/api/tickets`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TicketResponse[]> {
    return this.http.get<TicketResponse[]>(this.baseUrl);
  }

  getById(id: string): Observable<TicketResponse> {
    return this.http.get<TicketResponse>(`${this.baseUrl}/${id}`);
  }

  createTicket(body: CreateTicketRequest): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(this.baseUrl, body);
  }

  updateStatus(id: string, body: UpdateTicketStatusRequest): Observable<TicketResponse> {
    return this.http.put<TicketResponse>(`${this.baseUrl}/${id}/status`, body);
  }
}
