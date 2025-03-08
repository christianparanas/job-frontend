import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Adjust the backend URL here
  private readonly TOKEN_KEY = 'authToken'; // Key for storing token in localStorage
  private readonly USER_KEY = 'currentUser'; // Key for storing user data in localStorage

  constructor(private http: HttpClient) {}

  // Signup: Register a new user
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  // Login: Login a user and store the token/user data in localStorage
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Assuming the backend returns a token and/or user data
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token); // Store token
        }
        if (response.user) {
          localStorage.setItem(this.USER_KEY, JSON.stringify(response.user)); // Store user data
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

  // Get the stored user data
  getUser(): any | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Check if the user is authenticated (e.g., token exists)
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Logout: Clear session data from localStorage
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getUserRole(): string | null {
    const user = this.getUser();
    return user?.Roles[0].name || null; // Assumes role is returned in the user object
  }
}
