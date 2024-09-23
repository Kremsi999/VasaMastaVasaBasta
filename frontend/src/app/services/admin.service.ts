import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Firm } from '../models/Firm';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private uri = 'http://localhost:4000/admin';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(`${this.uri}/users`);
  }

  getFirms(){
    return this.http.get<Firm[]>(`${this.uri}/firms`);
  }

  editUser(userData: any) {
    return this.http.put(`${this.uri}/editUser`, userData);
  }

  reviewRegistrationRequest(username: string, status: string) {
    return this.http.put(`${this.uri}/acceptDenyUser`, { username, status });
  }

  addFirm(firmData: any) {
    return this.http.post(`${this.uri}/addFirm`, firmData);
  }

  addDecorator(decoratorData: any) {
    return this.http.post<User>(`${this.uri}/addDecorator`, decoratorData);
  }

}
