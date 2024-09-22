import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private uri = 'http://localhost:4000/app'; // Baza URL za API

  constructor(private http: HttpClient) {}

  getDashboardInfo() {
    return this.http.get(`${this.uri}/dashboard-info`);
  }
}
