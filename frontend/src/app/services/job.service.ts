import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private uri = 'http://localhost:4000/owner';

  constructor(private http: HttpClient) {}

  createJob(jobData: any){
    return this.http.post(`${this.uri}`, jobData);
  }

  getCurrentJobs(username: string){
    return this.http.post<any>(`${this.uri}/getAllActiveJobs`, {username});
  }

  getPastJobs(username: string){
    return this.http.post<any>(`${this.uri}/getAllArchivedJobs`, {username});
  }

  cancelJob(id: string){
    return this.http.delete(`${this.uri}/delete/${id}`);
  }

  submitReview(id: string, rating: number, comment: string, username: string){
    return this.http.post(`${this.uri}/addComment`, { rating, comment, id, username });
  }

  getComments(id: string){
    return this.http.post<Comment[]>(`${this.uri}/getComments`, { id });
  }

  getCompletedJobs(username: string) {
    return this.http.post<any>(`${this.uri}/getCompletedJobs`, {username});
  }

  getActiveMaintenance(username: string){
    return this.http.post<any>(`${this.uri}/getActiveMaintenanceJobs`, {username});
  }

  scheduleMaintenance(jobId: string){
    return this.http.post(`${this.uri}/scheduleMaintenance`, { jobId });
  }
}
