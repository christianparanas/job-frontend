import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SeekerAuthService } from './seeker-auth.service'; // Import SeekerAuthService for user authentication
import { catchError, tap } from 'rxjs/operators';

interface SkillLevel {
  skill: string;
  level: number; // Proficiency level (1-4)
}

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  private apiUrl = 'http://localhost:3000/api/assessment'; // Adjust the backend URL here
  private userLevels: { [skill: string]: number } = {}; // Store user proficiency levels by skill

  constructor(
    private http: HttpClient,
    private authService: SeekerAuthService
  ) {}

  // Submit assessment skill levels to the backend
  submitAnswers(skillLevels: SkillLevel[]): Observable<any> {
    const userId = this.authService.getUser()?.id; // Get user ID from SeekerAuthService
    if (!userId) {
      throw new Error('User not authenticated');
    }

    // Prepare data for backend submission
    const assessmentData = {
      userId,
      skillLevels, // Array of { skill, level } objects
    };

    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/submit`, assessmentData, { headers });
  }

  // Get the user's current proficiency levels
  getUserLevels(): { [skill: string]: number } {
    return { ...this.userLevels }; // Return a copy to prevent direct modification
  }

  // Clear assessment data (e.g., on logout or retake)
  clearAssessment(): void {
    this.userLevels = {};
  }
}
