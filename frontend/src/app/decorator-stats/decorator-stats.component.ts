import { Component } from '@angular/core';
import { StatServiceService } from '../services/stat-service.service';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-decorator-stats',
  templateUrl: './decorator-stats.component.html',
  styleUrls: ['./decorator-stats.component.css']
})
export class DecoratorStatsComponent {
  public histogramData: ChartData<'bar'> | undefined;
  public barChartOptions: ChartOptions = { responsive: true };
  public barChartData: ChartData<'bar'> | undefined;
  public pieChartData: ChartData<'pie'> | undefined;
  username = ''


  constructor(private statsService: StatServiceService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') ?? ''
    this.loadMonthlyJobStats();
    this.loadWeeklyAverage();
    this.loadJobDistribution();
  }

  loadWeeklyAverage(): void {
    this.statsService.getWeeklyAverage(this.username).subscribe((data) => {
      const labels = ['Pon', 'Utp', 'Sre', 'Cet', 'Pet', 'Sub', 'Ned'];
      const jobCounts = labels.map((_, index) => {
        const item = data.find(d => d._id.dayOfWeek === index + 1);
        return item ? item.averageJobs : 0;
      });

      this.histogramData = {
        labels: labels,
        datasets: [
          { data: jobCounts, label: 'Prosecan broj poslova', backgroundColor: '#66BB6A' }
        ]
      };
    });
  }

  loadMonthlyJobStats(): void {
    this.statsService.getJobsPerMonth(this.username).subscribe(data => {
      const labels = data.map(item => `${item._id.month}-${item._id.year}`);
      const jobCounts = data.map(item => item.count);

      this.barChartData = {
        labels: labels,
        datasets: [
          { data: jobCounts, label: 'Poslovi po mesecima', backgroundColor: '#42A5F5' }
        ]
      };
    });
  }

  loadJobDistribution(): void {
    this.statsService.getJobDistribution(this.username).subscribe(data => {
      const labels = data.map(item => `${item.decorator[0].firstName} ${item.decorator[0].lastName}`);
      const jobCounts = data.map(item => item.count);

      this.pieChartData = {
        labels: labels,
        datasets: [
          { data: jobCounts, backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }
        ]
      };
    });
  }
}
