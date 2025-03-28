// employer.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../shared/services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrl: './employer.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class EmployerComponent implements OnInit {
  employerId: number;
  employerData: any = {
    id: 0,
    username: 'N/A',
    email: 'N/A',
    password: 'N/A',
    firstname: 'N/A',
    middlename: 'N/A',
    lastname: 'N/A',
    gender: 'N/A',
    image: null,
    website: null,
    address: 'N/A',
    about: null,
    status: 'active',
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
      dateOfBirth: 'N/A',
      phoneNumber: 'N/A',
      occupation: 'N/A',
      educationalAttainment: "N/A",
      school: '',
      yearGraduated: 0,
      degreeEarned: '',
      maritalStatus: '',
      gwa: 85,
      createdAt: '2025-03-10T14:04:10.000Z',
      updatedAt: '2025-03-10T14:04:10.000Z',
      userId: 3,
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
        this.employerData = response;

      },
      error: (err: any) => {
        console.error('Error loading user:', err);
      },
    });
  }

  // Helper method to format the date
  formatDate(date: string): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${d.getFullYear()}`;
  }

  // Helper method to get the role name (adjusted for employer context)
  getRoleName(): string {
    return this.employerData.Roles && this.employerData.Roles.length > 0
      ? 'Employer'
      : 'N/A';
  }

  // Helper method to get status color
  getStatusColor(): string {
    return this.employerData.status === 'active'
      ? 'bg-green-100 text-green-600'
      : 'bg-red-100 text-red-800';
  }

  // Helper method to get verification status
  getVerificationStatus(): string {
    return this.employerData.isVerified ? 'Verified' : 'Not Verified';
  }

  getVerificationColor(): string {
    return this.employerData.isVerified
      ? 'bg-blue-100 text-blue-800'
      : 'bg-gray-100 text-gray-800';
  }
}
