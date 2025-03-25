import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import {
  ProfileService,
  UserProfile,
} from '../../../seeker/shared/services/profile.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-emp-account',
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    ToastModule,
    SelectModule
  ],
  templateUrl: './emp-account.component.html',
  styleUrls: ['./emp-account.component.css'],
  standalone: true,
  providers: [MessageService],
})
export class EmpAccountComponent implements OnInit {
  user: UserProfile = {
    id: 0, // Required field, default to 0 or adjust based on your logic
    firstname: '',
    middlename: '',
    lastname: '',
    image: '',
    gender: '',
    address: '',
    website: '',
    about: '',
    PersonalInformation: {
      dateOfBirth: '',
      phoneNumber: '',
      occupation: '',
      educationalAttainment: '',
      school: '',
      yearGraduated: 0,
      degreeEarned: '',
      maritalStatus: '',
      gwa: 0,
    },
  };

  educationOptions: string[] = [
    'High School Diploma',
    "Associate's Degree",
    "Bachelor's Degree",
    "Master's Degree",
    'Doctorate (PhD)',
  ];

  genderOptions: string[] = ['Male', 'Female', 'Others'];
  loading: boolean = false;

  private CLOUDINARY_CLOUD_NAME = 'dbpzvd84i'; // Replace with your Cloudinary cloud name
  private CLOUDINARY_UPLOAD_PRESET = 'aipsfcloud'; // Replace with your upload preset
  private CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${this.CLOUDINARY_CLOUD_NAME}/image/upload`;

  constructor(
    private messageService: MessageService,
    private profileService: ProfileService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.loading = true;
    this.profileService.getProfile().subscribe({
      next: (profile: any) => {
        this.user = {
          ...this.user, // Keep the initialized defaults
          ...profile, // Overwrite with API data
          PersonalInformation: {
            ...this.user.PersonalInformation, // Keep default personalinformation fields
            ...profile.PersonalInformation, // Overwrite with API personalinformation, if it exists
          },
        };
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.showError('Failed to load profile');
        this.loading = false;
      },
    });
  }

  async onProfilePictureChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Basic file validation
      if (!file.type.startsWith('image/')) {
        this.showError('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        this.showError('Image size must be less than 5MB');
        return;
      }

      this.loading = true;
      try {
        // Upload to Cloudinary
        const cloudinaryUrl = await this.uploadToCloudinary(file);

        // Update user image URL
        this.user.image = cloudinaryUrl;

        // Save to database
        this.profileService.updateProfile(this.user).subscribe({
          next: (updatedProfile) => {
            this.user = updatedProfile;
            this.loading = false;
            this.showSuccess('Profile picture updated successfully');
          },
          error: (error) => {
            console.error('Error updating profile:', error);
            this.showError('Failed to update profile picture');
            this.loading = false;
          },
        });
      } catch (error) {
        console.error('Upload error:', error);
        this.showError('Failed to upload picture');
        this.loading = false;
      }
    }
  }

  private async uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET);

    const response: any = await this.http
      .post(this.CLOUDINARY_API_URL, formData)
      .toPromise();

    if (response && (response as any).secure_url) {
      return response.secure_url;
    }

    throw new Error('Failed to get secure URL from Cloudinary response');
  }

  saveProfile() {
    this.loading = true;
    this.profileService.updateProfile(this.user).subscribe({
      next: (updatedProfile) => {
        this.user = updatedProfile;
        this.loading = false;
        this.showSuccess('Profile saved successfully');
      },
      error: (error) => {
        console.error('Error saving profile:', error);
        this.showError('Failed to save profile');
        this.loading = false;
      },
    });
  }

  private showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000,
      key: 'bl',
    });
  }

  private showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000,
      key: 'bl',
    });
  }
}
