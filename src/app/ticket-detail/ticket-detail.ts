
// src/app/ticket-detail/ticket-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// IMPORTANT: unify the service import path
import { TicketsService, UpdateTicketStatusRequest } from '../services/tickets.service';
import { TicketResponse, TicketStatus } from '../models/ticket.models';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.html',
  styleUrls: ['./ticket-detail.css'],
  standalone: false
})
export class TicketDetailsComponent implements OnInit {
  tickets: TicketResponse[] = [];
  loadingList = true;
  listError?: string;

  // Add: available statuses for the <select>
  statuses: TicketStatus[] = ['New', 'Open', 'InProgress', 'OnHold', 'Resolved', 'Closed'];

  /**
   * Track pending UI state per ticket id.
   * - pendingStatus: what user selected but not yet saved
   * - saving: ticket ids currently saving
   * - lastSavedOk / lastSavedErr: user feedback after save
   */
  pendingStatus: Record<string, TicketStatus | undefined> = {};
  private saving = new Set<string>();
  lastSavedOk: Record<string, string | undefined> = {};
  lastSavedErr: Record<string, string | undefined> = {};

  constructor(
    private router: Router,
    private ticketsSvc: TicketsService
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.loadingList = true;
    this.listError = undefined;

    this.ticketsSvc.getAll().subscribe({
      next: (res) => {
        this.tickets = res;
        this.loadingList = false;
      },
      error: (err) => {
        console.error('GET /api/tickets failed', err);
        this.listError = this.describeHttpError(err);
        this.loadingList = false;
      }
    });
  }

  // Navigate to /tickets/:id (existing behavior)
  open(id: string): void {
    this.router.navigate(['/tickets', id]);
  }

  trackById(_: number, t: TicketResponse) { return t.id; }

  // UI: when user changes the select
  onStatusSelect(t: TicketResponse, to: string) {
    // Trust only valid statuses
    if (this.statuses.includes(to as TicketStatus)) {
      this.pendingStatus[t.id] = to as TicketStatus;
      // clear prior messages
      this.lastSavedOk[t.id] = undefined;
      this.lastSavedErr[t.id] = undefined;
    }
  }

  // UI: Save click
  saveStatus(t: TicketResponse) {
    const toStatus = this.pendingStatus[t.id];
    if (!toStatus || toStatus === t.status) {
      return; // nothing to change
    }

    const body: UpdateTicketStatusRequest = {
      toStatus,
      changedByUserId: t.createdByUserId, // or current logged-in user GUID if you have it
      reason: 'Inline status update from ticket details.'
    };

    this.saving.add(t.id);
    this.lastSavedOk[t.id] = undefined;
    this.lastSavedErr[t.id] = undefined;

    this.ticketsSvc.updateStatus(t.id, body).subscribe({
      next: (updated) => {
        // Update local row
        const idx = this.tickets.findIndex(x => x.id === t.id);
        if (idx >= 0) this.tickets[idx] = updated;

        // Clear pending and show success
        delete this.pendingStatus[t.id];
        this.lastSavedOk[t.id] = 'Updated.';
        this.saving.delete(t.id);
      },
      error: (err) => {
        console.error(`PUT /api/tickets/${t.id}/status failed`, err);
        this.lastSavedErr[t.id] = this.describeHttpError(err);
        this.saving.delete(t.id);
      }
    });
  }

  isSaving(id: string): boolean {
    return this.saving.has(id);
  }

  private describeHttpError(err: any): string {
    if (!err) return 'Unknown error.';
    if (typeof err.error === 'string' && err.error.startsWith('<')) {
      return 'Received HTML instead of JSON. Fix proxy or service base URL.';
    }
    if (err.error?.message) return err.error.message;
    if (err.status) return `HTTP ${err.status} ${err.statusText} at ${err.url || ''}`;
    return 'Request failed.';
  }
}
``
