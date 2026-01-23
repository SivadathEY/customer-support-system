import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaReport } from './sla-report';

describe('SlaReport', () => {
  let component: SlaReport;
  let fixture: ComponentFixture<SlaReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlaReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlaReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
