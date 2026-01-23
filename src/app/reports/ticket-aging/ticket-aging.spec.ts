import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAging } from './ticket-aging';

describe('TicketAging', () => {
  let component: TicketAging;
  let fixture: ComponentFixture<TicketAging>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketAging]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketAging);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
