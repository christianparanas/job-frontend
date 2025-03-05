import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeekerAuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Adjust the backend URL here
  private readonly TOKEN_KEY = 'authToken'; // Key for storing token in localStorage
  private readonly USER_KEY = 'currentUser'; // Key for storing user data in localStorage

  constructor(private http: HttpClient) {}

  // Signup: Register a new user
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token); // Store token
        }
        if (response.user) {
          localStorage.setItem(this.USER_KEY, JSON.stringify(response.user)); // Store user data (including takenAssessment)
        }
      })
    );
  }

  // Login: Login a user and store the token/user data (including takenAssessment) in localStorage
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Assuming the backend returns a token and user data with takenAssessment
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token); // Store token
        }
        if (response.user) {
          localStorage.setItem(this.USER_KEY, JSON.stringify(response.user)); // Store user data (including takenAssessment)
        }
      })
    );
  }

  // Forgot Password: Send reset password email
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  // Reset Password: Reset the user's password using the reset token
  resetPassword(resetData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, resetData);
  }

  // Verify Email: Confirm user's email using verification token
  verifyEmail(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/verify-email/${token}`);
  }

  // Get the stored token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Get the stored user data (including takenAssessment)
  getUser(): any | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Get the user's role
  getRole(): string | string[] | null {
    const user = this.getUser();
    return user ? user.role : null; // Returns the role (e.g., 'User', 'Employer', 'Admin') or an array of roles if multiple
  }

  // Check if the user is authenticated (e.g., token exists)
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Check if the user has taken the assessment
  hasTakenAssessment(): boolean {
    const user = this.getUser();
    return user ? user.takenAssessment || false : false; // Default to false if not set
  }

  updateTakenAssessment(taken: boolean): void {
    const user = this.getUser();
    if (user) {
      user.takenAssessment = taken;
      localStorage.setItem(this.USER_KEY, JSON.stringify(user)); // Update user data in localStorage
    }
  }

  // Logout: Clear session data from localStorage
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  // Fetch user profile with role and takenAssessment (optional, if needed for refreshing user data)
  getUserProfile(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }
}
