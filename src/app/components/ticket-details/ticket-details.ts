import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { TicketResponse,UpdateTicketStatusRequest } from '../../models/tickets.models';
 
@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.html',
  styleUrls: ['./ticket-details.css'],
  standalone: false
})
export class TicketDetailsComponent {
  // Variables for the View
  ticketIdInput: string = ''; 
  ticket: TicketResponse | null = null;
  message: string = '';
  
  // Status Options (Must match your Backend Enum names exactly)
  statusOptions = ['New', 'Open', 'InProgress', 'OnHold', 'Resolved', 'Closed'];
  selectedStatus: string = '';
 
  constructor(private ticketService: TicketService) {}
 
  // 1. SEARCH: Get ticket details by ID
  searchTicket() {
  // ADD .trim() HERE 
  if (!this.ticketIdInput || !this.ticketIdInput.trim()) {
    alert('Please paste a Ticket ID first!');
    return;
  }
  
  this.message = 'Searching...';
  this.ticket = null;
 
  // AND ADD .trim() HERE
  this.ticketService.getTicketById(this.ticketIdInput.trim()).subscribe({
    next: (res) => {
      this.ticket = res;
      this.selectedStatus = res.status;
      this.message = '';
    },
    error: (err) => {
      console.error(err);
      this.message = 'Ticket not found! Check the ID and try again.';
    }
  });
}
 
 
  // 2. UPDATE: Change the status (The "Lifecycle" part)
  updateStatus() {
    if (!this.ticket) return;
 
    const request: UpdateTicketStatusRequest = {
      toStatus: this.selectedStatus,
      // Hardcoded "Agent" ID for now (since Login isn't ready)
      changedByUserId: '11111111-1111-1111-1111-111111111111', 
      reason: 'Status updated via Agent Dashboard'
    };
 
    this.ticketService.updateStatus(this.ticket.id, request).subscribe({
      next: (res) => {
        this.ticket = res; // Update the screen with new data
        this.message = 'Success! Status updated to ' + res.status;
      },
      error: (err) => {
        console.error(err);
        this.message = 'Failed to update status. Check console.';
      }
    });
  }
}
 