import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/shared/services/auth.service';

export interface UserProfile {
  id: number;
  firstname: string;
  middlename?: string;
  lastname: string;
  image?: string | null;
  gender: string | null;
  address?: string;
  website?: string;
  about?: string;
  PersonalInformation: {
    dateOfBirth?: string; // YYYY-MM-DD format
    phoneNumber?: string;
    occupation?: string;
    educationalAttainment?: string;
    school?: string;
    yearGraduated?: number;
    degreeEarned?: string;
    maritalStatus?: string;
    gwa: number
  };
}
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/api/user`;

  constructor(
    private http: HttpClient,
    private authService: AuthService // Inject SeekerAuthService for user ID only
  ) {}

  getProfile() {
    const userId = this.authService.getUser()?.id;
    return this.http.get<any>(`${this.apiUrl}/profile/${userId}`);
  }

  getProf() {
    const userId = this.authService.getUser()?.id;
    return this.http.get<any>(`${this.apiUrl}/prof/${userId}`);
  }

  // Update user profile using the user ID from localStorage as a path parameter
  updateProfile(profile: UserProfile): Observable<UserProfile> {
    const userId = this.authService.getUser()?.id;
    return this.http
      .put<UserProfile>(`${this.apiUrl}/profile/${userId}`, profile)
  }

  // Upload profile picture using the user ID from localStorage
  uploadProfilePicture(file: File): Observable<{ url: string }> {
    const userId = this.authService.getUser()?.id;
    if (!userId) {
      return throwError(() => new Error('User ID not found in localStorage'));
    }

    const formData = new FormData();
    formData.append('profilePicture', file);

    return this.http
      .post<{ url: string }>(
        `${this.apiUrl}/profile/picture?userId=${userId}`,
        formData
      )
      .pipe(
        tap((response) => console.log('Profile picture uploaded:', response)),
        catchError((error) => {
          console.error('Error uploading profile picture:', error);
          return throwError(() => error);
        })
      );
  }
}
