import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private uri = 'http://localhost:4000/auth'; // Baza URL za API

  constructor(private http: HttpClient) { }

  register(formData: FormData) {
    return this.http.post(`${this.uri}/register`, formData);
  }

  login(loginData: {username: string, password: string}) {
    return this.http.post(`${this.uri}/login`, loginData);
  }

  changePassword(changePasswordData: {username: string, password: string, newPassword: string}) {
    return this.http.post(`${this.uri}/changePassword`, changePasswordData);
  }

}
