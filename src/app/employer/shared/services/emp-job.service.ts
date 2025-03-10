import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/shared/services/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = `${environment.apiUrl}/api/job`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Get all jobs for the logged-in employer
  getJobs(): Observable<any[]> {
    const employerId = this.authService.getUser()?.id;
    return this.http.get<any[]>(`${this.apiUrl}/employerjobs/?employerId=${employerId}`, { headers: this.getHeaders() });
  }

  createJob(jobData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, jobData, { headers: this.getHeaders() });
  }

  getSkills(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/skills`, { headers: this.getHeaders() });
  }

  // Update job status
  updateJobStatus(jobId: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${jobId}`, { status }, { headers: this.getHeaders() });
  }

  // Delete a job
  deleteJob(jobId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${jobId}`, { headers: this.getHeaders() });
  }

  getJob(jobId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${jobId}`, { headers: this.getHeaders() });
  }

  getJobApplicants(jobId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${jobId}/applicants`, {
      headers: this.getHeaders(),
    });
  }

  updateJob(jobId: number, jobData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${jobId}`, jobData, { headers: this.getHeaders() });
  }
}
