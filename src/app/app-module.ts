
// src/app/app.module.ts
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// ✅ Make sure the routing file name/path is correct
// (Your file is app-routing.module.ts; the class is AppRoutingModule)
// import { AppRoutingModule } from './app-routing.module'; // <-- ✅ fixed path
import { AppRoutingModule } from './app-routing-module';

// ✅ Forms (needed for the TicketCreation form and ticket browser filter/dropdown)
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Root + existing components
import { App } from './app';
import { SlaReportComponent } from './reports/sla-report/sla-report';
import { AgentPerformanceComponent } from './reports/agent-perfomance/agent-perfomance';
import { TicketAgingComponent } from './reports/ticket-aging/ticket-aging';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';

// Your existing TicketCreation component
import { TicketCreationComponent } from './ticket-creation/ticket-creation';

// ✅ Ticket browser (master–detail)
import { TicketDetailsComponent } from './ticket-detail/ticket-detail';
// If the component lives under /tickets/ticket-details, use:
// import { TicketDetailsComponent } from './tickets/ticket-details/ticket-details.component';

@NgModule({
  declarations: [
    App,
    SlaReportComponent,
    AgentPerformanceComponent,
    TicketAgingComponent,
    AdminDashboard,
    TicketCreationComponent,
    TicketDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,      // ✅ routing with /tickets and /tickets/:id
    HttpClientModule,      // ✅ required for TicketsService HTTP calls
    ReactiveFormsModule,   // ✅ ticket creation reactive form
    FormsModule            // ✅ ngModel for filter & status dropdown
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
