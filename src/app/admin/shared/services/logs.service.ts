import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogService {
    private apiUrl = `${environment.apiUrl}/api/log`;


  constructor(private http: HttpClient) {}

  // Method to get users with the "User" role
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/logs`);
  }
}
