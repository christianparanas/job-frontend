import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-seeker-information',
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    ToastModule,
  ],
  templateUrl: './seeker-information.component.html',
  standalone: true,
  styleUrl: './seeker-information.component.css',
})
export class SeekerInformationComponent {
  user: any;

  constructor(private messageService: MessageService) {}

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'success',
      detail: 'Save Successfully',
      life: 3000,
      key: 'bl',
    });
  }

  ngOnInit() {
    this.user = {
      firstName: 'John',
      middleName: 'A.',
      lastName: 'Doe',
      education: "Bachelor's Degree",
      dob: '1990-05-15',
      gender: 'male',
      phone: '+1234567890',
      address: '123 Main Street, Cityville, Country',
    };
  }

  // Optionally, save the profile data
  saveProfile() {
    console.log('User Profile Saved', this.user);
    // Handle saving user data (e.g., send it to an API or update local storage)
  }

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
}
