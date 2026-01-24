import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // <--- IMPORTANT: For API calls
import { FormsModule } from '@angular/forms';           // <--- IMPORTANT: For Forms
 
// Check these imports match your file names
import { App } from './app';
import { CreateTicketComponent } from './components/create-ticket/create-ticket';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details'; // <--- Fixed Name
 
@NgModule({
  declarations: [
    App,
    CreateTicketComponent,
    TicketDetailsComponent // <--- Must match the class name above
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // <--- Add this to enable your Service
    FormsModule       // <--- Add this to enable ngModel
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }