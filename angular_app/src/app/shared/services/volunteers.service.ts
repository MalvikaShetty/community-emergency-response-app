import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VolunteerService {
  private apiUrl = 'https://localhost:44334/api/Volunteer/';

  constructor(private http: HttpClient) { }

  
  getVolunteers() {
    return this.http.get<any[]>(this.apiUrl);
  }

  createVolunteer(volunteerData: FormData) {
    return this.http.post(this.apiUrl + "addvolunteer", volunteerData);
  }

  getFileDownloadUrl(fileId: number): Observable<Blob> {
    const url = `${this.apiUrl}downloadFile/${fileId}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  getRoleOfUser(email: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}getRole/${email}`);
  }

  removeVolunteer(email: string, phoneNumber: string): Observable<any> {
    const body = { email, PhoneNumber: phoneNumber };
    return this.http.post<any>(`${this.apiUrl}removevolunteer`, body);
  }

  
}
