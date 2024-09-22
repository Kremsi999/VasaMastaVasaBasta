import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerProfileService {
  private uri = 'http://localhost:4000/owner/profile'; // API ruta

  constructor(private http: HttpClient) {}

  getProfile(username: string){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}`, data);
  }

  updateProfile(username: string, profileData: any) {
    return this.http.put(`${this.uri}`, profileData);
  }
}
