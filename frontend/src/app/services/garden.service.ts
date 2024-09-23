import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GardenService {
  private uri = 'http://localhost:4000/owner';

  constructor(private http: HttpClient) {}

  createGarden(gardenData: any){
    return this.http.post(`${this.uri}`, gardenData);
  }
}
