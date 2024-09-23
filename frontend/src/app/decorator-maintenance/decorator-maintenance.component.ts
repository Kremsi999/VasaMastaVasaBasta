import { FormGroup, FormBuilder } from '@angular/forms';
import { JobService } from './../services/job.service';
import { Component } from '@angular/core';
import { Job } from '../models/Job';

@Component({
  selector: 'app-decorator-maintenance',
  templateUrl: './decorator-maintenance.component.html',
  styleUrls: ['./decorator-maintenance.component.css']
})
export class DecoratorMaintenanceComponent {
  maintenanceRequests: Job[] = [];
  username = ''
  endDate: Date = new Date()

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') ?? ''
    this.loadMaintenanceRequests();
  }

  loadMaintenanceRequests(): void {
    this.jobService.getMaintenanceRequests(this.username).subscribe((data) => {
      this.maintenanceRequests = data;
    });
  }

  confirmMaintenance(jobId: string): void {
    console.log(this.endDate)
    if(this.endDate) {
      this.endDate = new Date(this.endDate);
      const dateStr = this.endDate.toISOString();
      console.log(dateStr)
      this.jobService.confirmMaintenance(jobId, dateStr).subscribe(() => {
        this.loadMaintenanceRequests();
      });
    }
  }

  rejectMaintenance(jobId: string, comment: string): void {
    this.jobService.rejectMaintenance(jobId, comment).subscribe(() => {
      this.loadMaintenanceRequests();
    });
  }
}
