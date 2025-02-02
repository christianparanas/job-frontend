import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-seeker-information',
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    ToastModule,
    SelectModule
  ],
  templateUrl: './seeker-information.component.html',
  standalone: true,
  styleUrls: ['./seeker-information.component.css'],
})
export class SeekerInformationComponent {
  user: any;
  educationOptions: string[] = [
    'High School Diploma',
    "Associate's Degree",
    "Bachelor's Degree",
    "Master's Degree",
    'Doctorate (PhD)',
  ];

  genderOptions: string[] = ['Male', 'Female', 'Others'];

  achievements = [
    { title: 'Daily Login', points: 1, icon: 'fad fa-sign-out' },
    { title: 'Weekly Challenge', points: 5, icon: 'fad fa-trophy' },
    { title: 'Perfect Score', points: 10, icon: 'fad fa-medal' },
    { title: 'Milestone Reached', points: 15, icon: 'fad fa-flag' },
    { title: 'Task Completion', points: 3, icon: 'fad fa-check' },
    { title: 'Early Bird', points: 2, icon: 'fad fa-sun' },
    { title: 'Quiz Master', points: 7, icon: 'fad fa-book-open' },
    { title: 'Explorer', points: 4, icon: 'fad fa-globe' },
  ];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    // Initialize user data
    this.user = {
      firstName: 'John',
      middleName: 'A.',
      lastName: 'Doe',
      education: "Bachelor's Degree", // Default to Bachelor's Degree
      dob: '1990-05-15',
      gender: 'male',
      phone: '+1234567890',
      address: '123 Main Street, Cityville, Country',
      careerGoals:
        'Become a senior developer and specialize in full-stack development.',
      profilePicture: null, // This will hold the profile picture file (base64 or URL)
    };
  }

  // Show a success message
  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Profile Saved Successfully',
      life: 3000,
      key: 'bl',
    });
  }

  // Handle profile picture change
  onProfilePictureChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.user.profilePicture = reader.result; // Store the base64 string of the profile picture
      };
      reader.readAsDataURL(file); // Convert image file to base64
    }
  }

  // Save profile data (for example, sending it to an API or storing locally)
  saveProfile() {
    console.log('User Profile Saved', this.user);
    this.show(); // Show success message after saving
  }
}
