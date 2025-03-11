import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/shared/services/auth.service';
import { environment } from '../../../../environments/environment';
// Import forkJoin from rxjs
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private apiUrl = `${environment.apiUrl}/api/candidate`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCandidate(id: number, jobId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/candidate/${id}?jobId=${jobId}`, {
      headers: this.getHeaders(),
    });
  }

  updateCandidateStatus(id: number, status: string): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/${id}/status`,
      { status },
      { headers: this.getHeaders() }
    );
  }

  // Placeholder for getting employer job IDs (requires JobService or endpoint)
  private getEmployerJobIds(employerId: number): Observable<number[]> {
    // This should be replaced with a real API call to get job IDs by employer
    // Example: return this.http.get<number[]>(`${this.apiUrl}/jobs/employer/${employerId}`);
    return new Observable((observer) => {
      // Mock data for now
      observer.next([1, 2, 3]); // Replace with real job IDs
      observer.complete();
    });
  }

  getAllCandidatesForEmployerJobs(employerId: any): Observable<any[]> {
    return this.http.get<any>(
      `${this.apiUrl}/employer-candidates/${employerId}`,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
