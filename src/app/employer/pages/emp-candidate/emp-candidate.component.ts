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

@Component({
  selector: 'app-emp-candidate',
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './emp-candidate.component.html',
  styleUrls: ['./emp-candidate.component.css'],
})
export class EmpCandidateComponent implements OnInit {
  candidate: any = {
    id: 0,
    name: 'Unknown Candidate',
    email: 'N/A',
    gender: 'N/A',
    address: 'N/A',
    skills: [],
    education: 'N/A',
    notes: 'No notes available.',
  };

  jobApplication: any = {
    status: '',
  };

  statusOptions = [
    { label: 'Pending', value: 'Pending' },
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
      if (userId) {
        this.loadCandidate(+userId);
      } else {
        this.router.navigate(['/employer/candidates']);
      }
    });
  }

  loadCandidate(userId: number): void {
    this.candidateService.getCandidate(userId).subscribe({
      next: (response: any) => {
        this.candidate = {
          id: response.id || 0,
          name:
            response.firstname + ' ' + response.lastname || 'Unknown Candidate',
          email: response.email || 'N/A',
          address: response.address || 'N/A',
          gender: response.gender || 'N/A',
          skills:
            response.skills?.map((s: any) => ({
              name: s.name || s.skill || 'Unknown Skill',
              proficiency: s.proficiency || 1,
            })) || [],
          education: response.PInfo?.educationalAttainment || 'N/A',
          notes: response.notes || 'No notes available.',
        };
        console.log('Candidate loaded:', response);
        console.log('Candidate loaded:', this.candidate);
      },
      error: (err: any) => {
        console.error('Error loading candidate:', err);
      },
    });
  }

  toggleStatus(newStatus: string): void {
    if (this.candidate.status === newStatus) return;

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
            this.candidate.status === 'Pending'
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
