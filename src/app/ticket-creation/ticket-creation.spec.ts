
// src/app/components/ticket-creation/ticket-creation.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { TicketCreationComponent } from './ticket-creation.component';
import { TicketCreationComponent } from './ticket-creation';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TicketCreationComponent', () => {
  let component: TicketCreationComponent;
  let fixture: ComponentFixture<TicketCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketCreationComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.form.valid).toBeFalse();
  });
});
