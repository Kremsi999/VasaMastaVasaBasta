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
    const formData = new FormData();
    formData.append('username', username);
    formData.append('firstName', profileData.firstName);
    formData.append('lastName', profileData.lastName);
    formData.append('address', profileData.address);
    formData.append('phone', profileData.phone);
    formData.append('email', profileData.email);
    formData.append('creditCardNumber', profileData.creditCardNumber);

    if (profileData.profilePicture) {
      formData.append('profilePicture', profileData.profilePicture);
    }

    return this.http.put(`${this.uri}`, formData);
  }
}
