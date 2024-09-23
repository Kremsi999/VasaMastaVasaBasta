import { Component } from '@angular/core';
import { JobService } from '../services/job.service';
import { Job } from '../models/Job';

@Component({
  selector: 'app-owner-maintenance',
  templateUrl: './owner-maintenance.component.html',
  styleUrls: ['./owner-maintenance.component.css']
})
export class OwnerMaintenanceComponent {
  completedJobs: Job[] = [];
  activeMaintenance: Job[] = [];
  username = ''

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') ?? ''
    this.loadCompletedJobs();
    this.loadActiveMaintenance();
  }

  loadCompletedJobs(): void {
    this.jobService.getCompletedJobs(this.username).subscribe(data => {
      this.completedJobs = data;
    });
  }

  loadActiveMaintenance(): void {
    this.jobService.getActiveMaintenance(this.username).subscribe(data => {
      this.activeMaintenance = data;
    });
  }

  isSixMonthsOrMore(endDate: Date): boolean {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = Math.abs(today.getTime() - end.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Претвори разлику у дане
    return diffDays >= 180; // 6 месеци је приближно 180 дана
  }

  scheduleMaintenance(jobId: string): void {
    this.jobService.scheduleMaintenance(jobId).subscribe(() => {
      this.loadCompletedJobs();
      this.loadActiveMaintenance();
    });
  }
}
