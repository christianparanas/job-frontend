import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/shared/services/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/api/user`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Helper to get headers with auth token
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Get all users
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getUsersWithAssessments() {
    return this.http.get<any[]>(`${this.apiUrl}/withassessment`, {
      headers: this.getHeaders(),
    });
  }

  getUsersByRole(role: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/role/${role}`, {
      headers: this.getHeaders(),
    });
  }

  getUserSkills(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/userskills/${userId}`, {
      headers: this.getHeaders(),
    });
  }

  // Get user statistics
  getUserStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`, {
      headers: this.getHeaders(),
    });
  }

  // Toggle user verification status
  toggleUserVerification(userId: string, isVerified: boolean): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${userId}`,
      { isVerified },
      { headers: this.getHeaders() }
    );
  }

  // Delete a user (optional admin feature)
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`, {
      headers: this.getHeaders(),
    });
  }

  // Update user role (optional admin feature)
  updateUserRole(userId: string, role: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${userId}/role`,
      { role },
      { headers: this.getHeaders() }
    );
  }

  getUser(userId: any) {
    return this.http.get<any>(`${this.apiUrl}/profile/${userId}`);
  }

  resendVerification(username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${username}/resend-verification`, {
      headers: this.getHeaders(),
    });
  }

  suspendUser(username: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${username}/suspend`, {
      headers: this.getHeaders(),
    });
  }

  unsuspendUser(username: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${username}/unsuspend`, {});
  }

  activateUser(username: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${username}/activate`, {});
  }
}
