import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Holyday {
  baseUrl = 'https://date.nager.at/api/v3/publicholidays';

  constructor(
    private http: HttpClient
  ) { }

  getHolyday(year: number, country: string) {
    return this.http.get(`${this.baseUrl}/${year}/${country}`);
  }

  getLocation(){
    // curl -X GET 'https://api.ipgeolocation.io/v2/ipgeo?apiKey=API_KEY&ip=8.8.8.8'
    return this.http.get('https://api.ipgeolocation.io/v2/ipgeo?apiKey=ac48009ec22a41d7936a823ce8ea093d');
  }
  // 
}
