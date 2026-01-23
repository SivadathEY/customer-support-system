
// src/app/models/ticket.models.ts

export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export type TicketStatus =
  | 'New'
  | 'Open'
  | 'InProgress'
  | 'OnHold'
  | 'Resolved'
  | 'Closed';

export interface TicketResponse {
  id: string;                // Guid
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  categoryId: number;
  createdByUserId: string;   // Guid
  assignedToUserId?: string | null;
  createdAtUtc: string;      // ISO string
  updatedAtUtc: string;      // ISO string
}

export interface CreateTicketRequest {
  title: string;
  description: string;
  categoryId: number;
  priority: TicketPriority | string;
  createdByUserId: string;
}
