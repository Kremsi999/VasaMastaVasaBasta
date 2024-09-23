import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatServiceService {
  private decoratorUri = 'http://localhost:4000/decorator';

  constructor(private http: HttpClient) { }

  getJobsPerMonth(username: string) {
    return this.http.post<any[]>(`${this.decoratorUri}/numberOfJobsByMonthForDecorator`, {username});
  }

  getJobDistribution(username: string){
    return this.http.post<any[]>(`${this.decoratorUri}/jobWeightBetweenDecorators`, {username});
  }

  getWeeklyAverage(username: string) {
    return this.http.post<any[]>(`${this.decoratorUri}/averageDaysForJobByDecorator`, {username});
  }
}
