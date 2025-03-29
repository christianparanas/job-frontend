// seeker.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrl: './seeker.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class SeekerComponent implements OnInit {
  seekerId: number;
  seekerData: any = {
    id: 0,
    username: 'N/A',
    email: 'N/A',
    firstname: 'N/A',
    middlename: 'N/A',
    lastname: 'N/A',
    gender: 'N/A',
    image: null,
    website: null,
    address: 'N/A',
    about: null,
    status: 'inactive',
    takenAssessment: true,
    isVerified: true,
    createdAt: '2025-03-09T15:06:27.000Z',
    updatedAt: '2025-03-10T14:04:10.000Z',
    Roles: [
      {
        id: 1,
        name: 'User',
        createdAt: '2025-03-09T15:06:26.000Z',
        updatedAt: '2025-03-09T15:06:26.000Z',
        UserRole: {
          userId: 3,
          roleId: 1,
          createdAt: '2025-03-09T15:06:27.000Z',
          updatedAt: '2025-03-10T21:10:49.000Z',
        },
      },
    ],
    PersonalInformation: {
      id: 1,
      dateOfBirth: '',
      phoneNumber: '',
      occupation: '',
      educationalAttainment: "N/A",
      school: '',
      yearGraduated: 0,
      degreeEarned: '',
      maritalStatus: '',
      gwa: "N/A",
      createdAt: '2025-03-10T14:04:10.000Z',
      updatedAt: '2025-03-10T14:04:10.000Z',
      userId: 0,
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const userId = params['id'];

      if (userId) {
        this.getUser(userId);
      } else {
        this.router.navigate(['/employer/users']);
      }
    });
  }

  getUser(userId: any) {
    this.adminService.getUser(userId).subscribe({
      next: (response: any) => {
        this.seekerData = response;

      },
      error: (err: any) => {
        console.error('Error loading user:', err);
      },
    });
  }

  // Helper method to format the date of birth
  formatDate(date: string): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${d.getFullYear()}`;
  }

  // Helper method to get the role name
  getRoleName(): string {
    return this.seekerData.Roles && this.seekerData.Roles.length > 0
      ? this.seekerData.Roles[0].name
      : 'N/A';
  }

  // Helper method to get status color
  getStatusColor(): string {
    return this.seekerData.status === 'active'
      ? 'bg-green-100 text-green-600'
      : 'bg-red-100 text-red-800';
  }

  // Helper method to get verification status
  getVerificationStatus(): string {
    return this.seekerData.isVerified ? 'Verified' : 'Not Verified';
  }

  getVerificationColor(): string {
    return this.seekerData.isVerified
      ? 'bg-blue-100 text-blue-800'
      : 'bg-gray-100 text-gray-800';
  }
}
