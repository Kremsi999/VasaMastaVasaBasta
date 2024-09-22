import { Component } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  dashboardData: any;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardInfo().subscribe(
      data => {
        this.dashboardData = data;
      },
      error => {
        console.error('Greška pri dohvatanju podataka', error);
      }
    );
  }

  sortFirms(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.dashboardData.firms.sort((a: any, b: any) => {
      if (this.sortDirection === 'asc') {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
  }

  searchFirms(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
  
    if (query) {
      this.dashboardData.firms = this.dashboardData.firms.filter((firm: any) =>
        firm.name.toLowerCase().includes(query.toLowerCase()) ||
        firm.address.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.ngOnInit(); // Ponovo dohvatiti podatke ako je pretraga prazna
    }
  }
}
