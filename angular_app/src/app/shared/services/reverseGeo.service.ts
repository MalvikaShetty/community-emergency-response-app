import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReverseGeoService {

  private apiKey = 'YOUR API KEY'; // Your Geoapify API key

  constructor(private http: HttpClient) { }

  getReverseGeocoding(latitude: number, longitude: number): Observable<any> {
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}
