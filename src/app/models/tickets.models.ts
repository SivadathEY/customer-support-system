// src/app/models/ticket.models.ts
 
// Matches your "TicketResponse.cs"
export interface TicketResponse {
  id: string; // Guid
  title: string;
  description: string;
  status: string;
  priority: string;
  categoryId: number;
  createdByUserId: string; // Guid
  assignedToUserId?: string; // Guid (nullable)
  createdAtUtc: string; // DateTime
  updatedAtUtc?: string; // DateTime (nullable)
}
 
// Matches your "CreateTicketRequest.cs"
export interface CreateTicketRequest {
  title: string;
  description: string;
  priority: string; // "Low", "Medium", "High", "Critical"
  categoryId: number;
  createdByUserId: string; // We will hardcode this for now since Auth isn't ready
}
 
// Matches your "UpdateTicketStatusRequest.cs"
export interface UpdateTicketStatusRequest {
  toStatus: string; // "Open", "InProgress", "Resolved", etc.
  changedByUserId: string;
  reason?: string;
}
 
// Hardcoded lists to match your Enums for Dropdowns
export const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
// You didn't give me a Category list, so I'll assume these IDs for the demo:
export const CATEGORIES = [
  { id: 1, name: 'Billing' },
  { id: 2, name: 'Technical' },
  { id: 3, name: 'General' }
];
 