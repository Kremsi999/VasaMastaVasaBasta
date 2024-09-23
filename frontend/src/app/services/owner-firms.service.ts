import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerFirmsService {
  private apiUrl = 'http://localhost:4000/owner';

  constructor(private http: HttpClient) {}

  getFirms(){
    return this.http.post<any>(`${this.apiUrl}/getFirms`, {});
  }

  getFirmById(id: string){
    const data = {
      id: id
    }
    return this.http.post<any>(`${this.apiUrl}/getFirmDetails`, data);
  }
}
