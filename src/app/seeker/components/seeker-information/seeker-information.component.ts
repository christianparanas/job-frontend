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
} from '../../shared/services/profile.service';

@Component({
  selector: 'app-seeker-information',
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    ToastModule,
    SelectModule,
  ],
  templateUrl: './seeker-information.component.html',
  styleUrls: ['./seeker-information.component.css'],
  standalone: true,
  providers: [MessageService],
})
export class SeekerInformationComponent implements OnInit {
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
      gwa: 0
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

  constructor(
    private messageService: MessageService,
    private profileService: ProfileService
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
          ...profile,   // Overwrite with API data
          PersonalInformation: {
            ...this.user.PersonalInformation, // Keep default personalinformation fields
            ...profile.PersonalInformation    // Overwrite with API personalinformation, if it exists
          }
        };
        this.loading = false;

        this.user);
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.showError('Failed to load profile');
        this.loading = false;
      },
    });
  }

  onProfilePictureChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.loading = true;
      this.profileService.uploadProfilePicture(file).subscribe({
        next: (response) => {
          this.user.image = response.url;
          this.loading = false;
          this.showSuccess('Profile picture updated');
        },
        error: (error) => {
          console.error('Error uploading picture:', error);
          this.showError('Failed to upload picture');
          this.loading = false;
        },
      });
    }
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
