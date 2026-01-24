import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { CreateTicketRequest, CATEGORIES, PRIORITIES } from '../../models/tickets.models';
 
@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.html',
  styleUrls: ['./create-ticket.css'] ,// Make sure this file exists, even if empty
  standalone:false
})
export class CreateTicketComponent {
  // Form Model
  ticket: CreateTicketRequest = {
    title: '',
    description: '',
    priority: 'Medium', // Default
    categoryId: 1,      // Default to Billing
    // GENERIC GUID FOR TESTING (Since Dev 1 hasn't finished Login yet)
    createdByUserId: '11111111-1111-1111-1111-111111111111' 
  };
 
  // Dropdown options
  categories = CATEGORIES;
  priorities = PRIORITIES;
 
  // Feedback message
  message: string = '';
 
  constructor(private ticketService: TicketService) {}
 
  onSubmit() {
    this.ticketService.createTicket(this.ticket).subscribe({
      next: (response) => {
        this.message = `Success! Ticket Created. ID: ${response.id}`;
        // Optional: Clear form
        this.ticket.title = '';
        this.ticket.description = '';
      },
      error: (error) => {
        console.error('API Error:', error);
        this.message = 'Error creating ticket. Check console for details.';
      }
    });
  }
}
