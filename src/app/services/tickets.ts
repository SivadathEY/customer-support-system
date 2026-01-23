
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateTicketRequest,TicketResponse } from '../models/ticket.models';

import { Observable } from 'rxjs';
// import {
//   CreateTicketRequest,
//   TicketResponse
// } from '../models/ticket.models';

@Injectable({ providedIn: 'root' })
export class TicketsService {
  private readonly baseUrl = 'https://localhost:7284/api/tickets';

  constructor(private http: HttpClient) {}

  createTicket(payload: CreateTicketRequest): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(this.baseUrl, payload);
  }

  getAll(): Observable<TicketResponse[]> {
    return this.http.get<TicketResponse[]>(this.baseUrl);
  }
}
