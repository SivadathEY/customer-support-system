import { Component,OnInit} from '@angular/core';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-ticket-aging',
  standalone: false,
  templateUrl: './ticket-aging.html',
  styleUrl: './ticket-aging.css',
})
export class TicketAgingComponent implements OnInit {
 
  agingData: any[] = [];
 
  constructor(private reportsService: ReportsService) {}
 
  ngOnInit(): void {
    this.reportsService.getTicketAging().subscribe(data => {
      this.agingData = data;
    });
  }
 
  getColor(bucket: string): string {
    if (bucket === '24+ hrs') return 'red';
    if (bucket === '4-24 hrs') return 'orange';
    return 'green';
  }
 
  isHighRisk(bucket: string): boolean {
    return bucket === '24+ hrs';
  }
}