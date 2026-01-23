import { Component,OnInit} from '@angular/core';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-agent-perfomance',
  standalone: false,
  templateUrl: './agent-perfomance.html',
  styleUrl: './agent-perfomance.css',
})

export class AgentPerformanceComponent implements OnInit {

  agents: any[] = [];

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.reportsService.getAgentPerformance().subscribe(data => {
      this.agents = data.map(agent => ({
        ...agent,
        slaPercent: this.calculateSla(agent)
      }));
    });
  }

  calculateSla(agent: any): number {
    if (agent.ticketsHandled === 0) return 0;
    return ((agent.ticketsHandled - agent.slaBreachedCount)
      / agent.ticketsHandled) * 100;
  }
}