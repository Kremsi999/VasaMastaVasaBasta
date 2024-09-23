import { Component } from '@angular/core';
import { OwnerFirmsService } from '../services/owner-firms.service';

@Component({
  selector: 'app-owner-firms-page',
  templateUrl: './owner-firms-page.component.html',
  styleUrls: ['./owner-firms-page.component.css']
})
export class OwnerFirmsPageComponent {
  firms: any[] = [];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private firmService: OwnerFirmsService) {}

  ngOnInit(): void {
    this.firmService.getFirms().subscribe(data => {
      this.firms = data;
    });
  }

  sortFirms(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.firms.sort((a: any, b: any) => {
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
      this.firms = this.firms.filter((firm: any) =>
        firm.name.toLowerCase().includes(query.toLowerCase()) ||
        firm.address.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.ngOnInit(); 
    }
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, index) => index < rating ? 1 : 0);
  }
}
