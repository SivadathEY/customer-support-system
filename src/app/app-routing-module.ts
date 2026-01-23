
// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { SlaReportComponent } from './reports/sla-report/sla-report';
import { AgentPerformanceComponent } from './reports/agent-perfomance/agent-perfomance';
import { TicketAgingComponent } from './reports/ticket-aging/ticket-aging';

// Ticket creation page
import { TicketCreationComponent } from './ticket-creation/ticket-creation';

// ✅ Ticket browser (master–detail)
import { TicketDetailsComponent } from './ticket-detail/ticket-detail';
// If your component is actually at: ./tickets/ticket-details/ticket-details.component
// use this instead:
// import { TicketDetailsComponent } from './tickets/ticket-details/ticket-details.component';

const routes: Routes = [
  // Choose your app's landing page (uncomment one):
  // { path: '', component: AdminDashboard },                 // Dashboard as home
  { path: '', redirectTo: 'tickets', pathMatch: 'full' },     // Ticket browser as home

  // Reports (enable if you need them)
  // { path: 'reports/sla', component: SlaReportComponent },
  // { path: 'reports/agents', component: AgentPerformanceComponent },
  // { path: 'reports/aging', component: TicketAgingComponent },

  // Ticket creation
  { path: 'ticketcreation', component: TicketCreationComponent },

  // ✅ Master–detail ticket browser
  // List-only view (left pane visible, right pane shows empty state)
  { path: 'tickets', component: TicketDetailsComponent },

  // Detail view (select ticket in right pane; keeps list visible)
  { path: 'tickets/:id', component: TicketDetailsComponent },

  // ✅ Optional: keep backward compatibility with old route shape
  // If somewhere you still navigate to /ticket-detail/:id, redirect to the new canonical route.
  { path: 'ticket-detail/:id', redirectTo: 'tickets/:id' },

  // ✅ Optional: wildcard — route unknown paths to tickets (or to ticketcreation if you prefer)
  // { path: '**', redirectTo: 'tickets' },
  // { path: '**', redirectTo: 'ticketcreation' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
