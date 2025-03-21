import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { AuthService } from '../../../core/shared/services/auth.service';
import { CandidateService } from '../../shared/services/emp-candidate.service';
import { BadgeModule } from 'primeng/badge';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-emp-candidate',
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    FormsModule,
    BadgeModule,
    SelectModule
  ],
  standalone: true,
  templateUrl: './emp-candidate.component.html',
  styleUrls: ['./emp-candidate.component.css'],
})
export class EmpCandidateComponent implements OnInit {
  candidate: any = {
    appliedDate: '',
    status: '',
    applicant: {
      id: 0,
      name: '',
      image: '',
      gender: '',
      address: '',
      website: '',
      about: '',
      PersonalInformation: {
        dateOfBirth: '', // YYYY-MM-DD format
        phoneNumber: '',
        occupation: '',
        educationalAttainment: '',
        school: '',
        yearGraduated: 0,
        degreeEarned: '',
        maritalStatus: '',
        gwa: 0,
      },
    },
  };

  jobApplication: any = {
    status: '',
  };

  statusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Hired', value: 'Hired' },
    { label: 'Shortlisted', value: 'Shortlisted' },
    { label: 'Rejected', value: 'Rejected' },
  ];

  proficiencyOptions = [
    { label: '1 - Basic', value: 1 },
    { label: '2 - Intermediate', value: 2 },
    { label: '3 - Advanced', value: 3 },
    { label: '4 - Expert', value: 4 },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService,
    private toast: HotToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const userId = params['id'];
      const jobId = params['jobId'];
      if (userId) {
        this.loadCandidate(+userId, +jobId);
      } else {
        this.router.navigate(['/employer/candidates']);
      }
    });
  }

  calculateAge(birthdate: any) {
    const birthDate = new Date(birthdate);
    const today = new Date(); // Current date as per your context
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if birthday hasn't occurred this year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  loadCandidate(userId: number, jobId: number): void {
    this.candidateService.getCandidate(userId, jobId).subscribe({
      next: (response: any) => {
        this.candidate = response;

      },
      error: (err: any) => {
        console.error('Error loading candidate:', err);
      },
    });
  }

  toggleStatus(newStatus: string): void {
    this.candidate.status = newStatus;
    this.candidateService
      .updateCandidateStatus(this.candidate.id, newStatus)
      .subscribe({
        next: () => {
          this.toast.success(
            `Updated ${this.candidate.name}'s status to ${newStatus}`
          );
        },
        error: (err: any) => {
          console.error('Error updating status:', err);
          this.toast.error('Failed to update status.');
          this.candidate.status =
            this.candidate.status == 'Pending' || this.candidate.status == null
              ? 'Pending'
              : this.candidate.status; // Revert
        },
      });
  }

  downloadResume(): void {
    if (this.candidate.resumeUrl) {
      window.open(this.candidate.resumeUrl, '_blank');
    } else {
      this.toast.error('No resume available for download.');
    }
  }

  formatDate(date: string | undefined): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return isNaN(d.getTime())
      ? 'N/A'
      : d.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
  }
}
