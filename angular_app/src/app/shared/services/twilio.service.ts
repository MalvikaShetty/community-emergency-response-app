import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
  })
  
export class TwilioService {
    constructor(private http: HttpClient) { }

    readonly apiUrl="https://localhost:44334/api/Alert/sendsms"

  sendSMS(phoneNumber: string, message: string) {
    console.log('phoneNumber:', phoneNumber);
    console.log('message:', message);
    return this.http.post(this.apiUrl, { phoneNumber, message });
  }
}
