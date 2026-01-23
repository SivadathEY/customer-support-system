import { Component,OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-sla-report',
  standalone: false,
  templateUrl: './sla-report.html',
  styleUrl: './sla-report.css',
})
export class SlaReportComponent implements OnInit {

  report: any;
  compliancePercent = 0;

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.reportsService.getSlaReport().subscribe(data => {
      this.report = data;
      this.calculateCompliance();
    });
  }

  calculateCompliance() {
    if (this.report.totalTickets > 0) {
      this.compliancePercent =
        (this.report.slaMet / this.report.totalTickets) * 100;
    }
  }
}
