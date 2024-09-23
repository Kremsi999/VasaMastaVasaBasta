import { Component } from '@angular/core';
import { Job } from '../models/Job';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-decorator-scheduling',
  templateUrl: './decorator-scheduling.component.html',
  styleUrls: ['./decorator-scheduling.component.css']
})
export class DecoratorSchedulingComponent {
  pendingJobs: Job[] = [];
  confirmedJobs: Job[] = [];
  comment: string = '';
  selectedFile?: File = undefined;
  username = ''

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') ?? ''
    this.loadPendingJobs();
    this.loadConfirmedJobs();
  }

  loadPendingJobs(): void {
    this.jobService.getPendingJobs(this.username).subscribe(data => {
      this.pendingJobs = data;
    });
  }

  loadConfirmedJobs(): void {
    this.jobService.getConfirmedJobs(this.username).subscribe(data => {
      this.confirmedJobs = data;
    });
  }

  confirmJob(jobId: string): void {
    this.jobService.acceptJob(jobId, this.username).subscribe(() => {
      this.loadPendingJobs();
      this.loadConfirmedJobs();
    });
  }

  rejectJob(jobId: string): void {
    if (this.comment.trim()) {
      this.jobService.rejectJob(jobId, this.comment).subscribe(() => {
        this.loadPendingJobs();
      });
    } else {
      alert('Коментар је обавезан при одбијању');
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }


  completeJob(jobId: string): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('photo', this.selectedFile);
      formData.append('jobId', jobId)
      formData.append('username', this.username)

      this.jobService.completeJob(formData).subscribe(() => {
        this.loadConfirmedJobs();
      });
    } else {
      alert('Морате додати фотографију');
    }
  }
}
