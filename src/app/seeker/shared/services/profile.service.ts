import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SeekerAuthService } from './seeker-auth.service'; // Import for user ID
import { catchError, tap } from 'rxjs/operators';

export interface UserProfile {
  id: number;
  firstname: string;
  middlename?: string;
  lastname: string;
  image?: string | null;
  gender: string | null;
  PersonalInformation: {
    dateOfBirth?: string; // YYYY-MM-DD format
    phoneNumber?: string;
    address?: string;
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
  private apiUrl = 'http://localhost:3000/api/user'; // Adjust to your backend URL

  constructor(
    private http: HttpClient,
    private authService: SeekerAuthService // Inject SeekerAuthService for user ID only
  ) {}

  getProfile() {
    const userId = this.authService.getUser()?.id;
    return this.http.get<any>(`${this.apiUrl}/profile/${userId}`);
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
