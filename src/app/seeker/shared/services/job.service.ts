import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAlignedJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/job/aligned`);
  }

  getAppliedJobs(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/candidate?userId=${userId}`);
  }

  applyForJob(jobId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/candidate`, { jobId, userId });
  }

  withdrawApplication(candidateId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/candidate/${candidateId}`);
  }
}
