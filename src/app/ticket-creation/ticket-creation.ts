
// src/app/components/ticket-creation/ticket-creation.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
// import { TicketsService } from '../../services/tickets.service';
import { TicketsService } from '../services/tickets';
// import { TicketAgingComponent } from '../reports/ticket-aging/ticket-aging';
// import { TicketPriority, TicketResponse, CreateTicketRequest } from '../../models/ticket.models';
import { TicketPriority,TicketResponse,CreateTicketRequest } from '../models/ticket.models';

@Component({
  selector: 'app-ticket-creation',
  templateUrl: './ticket-creation.html',
  standalone:false,
  styleUrls: ['./ticket-creation.css']
  // standalone: false // omitted on purpose; this is module-based
})
export class TicketCreationComponent implements OnInit {
  priorities: TicketPriority[] = ['Low', 'Medium', 'High', 'Critical'];

  // Declare first; initialize later (in ngOnInit) to avoid TS2729.
  form!: FormGroup;

  submitting = false;
  error: string | null = null;
  successMsg: string | null = null;

  // List state
  loadingList = false;
  listError: string | null = null;
  tickets: TicketResponse[] = [];

  constructor(private fb: FormBuilder, private ticketsSvc: TicketsService) {}

  ngOnInit(): void {
    // Initialize here so `this.fb` is available.
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.required]],
      categoryId: [0, [Validators.required, Validators.min(0)]],
      priority: ['Medium', [Validators.required]],
      createdByUserId: ['', [Validators.required]] // GUID
    });

    this.loadTickets();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.error = null;
    this.successMsg = null;

    const payload: CreateTicketRequest = this.form.getRawValue() as CreateTicketRequest;

    this.ticketsSvc.createTicket(payload).subscribe({
      next: (res: TicketResponse) => {
        this.successMsg = `Ticket created. Id: ${res.id}`;
        this.submitting = false;

        // Reset to defaults
        this.form.reset({
          title: '',
          description: '',
          categoryId: 0,
          priority: 'Medium',
          createdByUserId: ''
        });

        // Refresh list
        this.loadTickets();
      },
      error: (err: HttpErrorResponse) => {
        const message =
          (typeof err.error === 'string' && err.error) ||
          (err.error?.message as string) ||
          err.message ||
          'Failed to create ticket.';
        this.error = message;
        this.submitting = false;
      }
    });
  }

  loadTickets(): void {
    this.loadingList = true;
    this.listError = null;

    this.ticketsSvc.getAll().subscribe({
      next: (res: TicketResponse[]) => {
        this.tickets = res;
        this.loadingList = false;
      },
      error: (err: HttpErrorResponse) => {
        const message =
          (typeof err.error === 'string' && err.error) ||
          (err.error?.message as string) ||
          err.message ||
          'Failed to load tickets.';
        this.listError = message;
        this.loadingList = false;
      }
    });
  }
}
