import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { Job } from '../models/Job';
import { Comment } from '../models/Comment';
import { OwnerFirmsService } from '../services/owner-firms.service';
import { Firm } from '../models/Firm';

@Component({
  selector: 'app-owner-scheduling',
  templateUrl: './owner-scheduling.component.html',
  styleUrls: ['./owner-scheduling.component.css']
})
export class OwnerSchedulingComponent implements OnInit {
  currentJobs: Job[] = [];
  pastJobs: Job[] = [];
  selectedJob?: Job = undefined;
  rating: number = 0;
  commentsMap: Map<string, Comment[]> = new Map();
  comments: Comment[] = [];
  comment: string = '';
  username: string = ''
  firmMap: Map<string, any> = new Map();

  constructor(private jobService: JobService, private firmService: OwnerFirmsService) {}

  ngOnInit(): void {
      this.username = localStorage.getItem('username') ?? '';
      this.loadCurrentJobs();
      this.loadPastJobs();
  }

  loadCurrentJobs(): void {
    this.jobService.getCurrentJobs(this.username).subscribe(data => {
      this.currentJobs = data;
      
      this.currentJobs.forEach(el => {
        this.getComments(el._id).subscribe((commentsData) => {
          this.commentsMap.set(el._id, commentsData);
        });

        this.firmMap.set(el.firmId._id, el.firmId);
      });

      console.log(this.commentsMap);
      console.log(this.firmMap);
    });
  }

  loadPastJobs(): void {
    this.jobService.getPastJobs(this.username).subscribe(data => {
      this.pastJobs = data;

      this.pastJobs.forEach(el => {
        this.getComments(el._id).subscribe((commentsData) => {
          this.commentsMap.set(el._id, commentsData);
        });

        this.firmMap.set(el.firmId._id, el.firmId);
      });

      console.log(this.commentsMap);
      console.log(this.firmMap);
    });
  }

  getComments(jobId: string) {
    return this.jobService.getComments(jobId);
  }

  cancelJob(jobId: string): void {
    this.jobService.cancelJob(jobId).subscribe(() => {
      this.loadCurrentJobs();
    });
  }


  openReviewForm(job: any): void {
    this.selectedJob = job;
  }

  daysUntilJob(startDate: Date): number {
    const today = new Date();
    const jobDate = new Date(startDate);

    const timeDifference = jobDate.getTime() - today.getTime();

    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  }

  submitReview(): void {
    this.jobService.submitReview(this.selectedJob!._id, this.rating, this.comment, this.username).subscribe(() => {
      this.loadPastJobs();
      this.selectedJob = undefined;
    });
  }
}
