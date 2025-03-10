import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/shared/services/auth.service';

interface SkillLevel {
  skill: string;
  level: number;
}

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  private apiUrl = `${environment.apiUrl}/api/assessment`;
  private userLevels: { [skill: string]: number } = {};

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  submitAnswers(skillLevels: SkillLevel[]): Observable<any> {
    const userId = this.authService.getUser()?.id;
    const assessmentData = {
      userId,
      skillLevels,
    };

    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/submit`, assessmentData, { headers });
  }

  getUserLevels(): { [skill: string]: number } {
    return { ...this.userLevels };
  }

  clearAssessment(): void {
    this.userLevels = {};
  }
}
