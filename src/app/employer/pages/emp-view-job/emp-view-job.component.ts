import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { JobService } from '../../shared/services/emp-job.service';
import { AuthService } from '../../../core/shared/services/auth.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { Observable } from 'rxjs';

interface Job {
  id: number;
  title: string;
  description: string;
  requirements: { skill: string; proficiency: number }[];
  location: string;
  salary: string;
  type: string;
  status: string;
  updatedAt: string;
  applications: [];
}

interface Applicant {
  id: number;
  name: string;
  appliedDate: string;
  gwa: number;
  rank?: number; // Added to store the applicant's rank
}

@Component({
  selector: 'app-emp-view-job',
  imports: [CommonModule, RouterModule, ButtonModule, BadgeModule],
  templateUrl: './emp-view-job.component.html',
  styleUrls: ['./emp-view-job.component.css'],
  standalone: true,
})
export class EmpViewJobComponent implements OnInit {
  job: Job | null = null;
  applicants: Applicant[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private authService: AuthService,
    private toast: HotToastService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const jobId = params['id'];
      if (jobId) {
        this.loadJob(+jobId);
      } else {
        this.router.navigate(['/employer/jobs']);
      }
    });
  }

  loadJob(jobId: number): void {
    this.jobService.getJob(jobId).subscribe({
      next: (response) => {
        this.job = {
          id: response.id,
          title: response.title,
          description: response.description,
          requirements: response.Skills.map((req: any) => ({
            skill: req.name,
            proficiency: req.JobRequirement.proficiency,
          })),
          location: response.location,
          salary: response.salary,
          type: response.type,
          status: response.status,
          updatedAt: response.updatedAt || response.createdAt,
          applications: response.Candidates,
        };

        this.loadApplicants(jobId);
      },
      error: (err) => {
        console.error('Error loading job:', err);
        this.job = null;
        this.toast.error('Failed to load job details.');
      },
    });
  }

  loadApplicants(jobId: number): void {
    this.jobService.getJobApplicants(jobId).subscribe({
      next: (response) => {
        // Map and sort applicants by GWA in descending order
        this.applicants = response
          .map((applicant: any) => ({
            id: applicant.id,
            name:
              applicant.applicant?.firstname +
              ' ' +
              applicant.applicant?.lastname,
            gwa: applicant.applicant?.PersonalInformation.gwa || 0, // Fallback to 0 if GWA is missing
            appliedDate: applicant.appliedDate || applicant.createdAt,
          }))
          .sort((a: Applicant, b: Applicant) => b.gwa - a.gwa) // Sort by GWA (highest to lowest)
          .map((applicant: Applicant, index: number) => ({
            ...applicant,
            rank: index + 1, // Add rank (1-based index)
          }));
      },
      error: (err) => {
        console.error('Error loading applicants:', err);
        this.applicants = [];
        this.toast.error('Failed to load applicants.');
      },
    });
  }

  // Helper method to format the rank (e.g., 1st, 2nd, 3rd)
  getRankLabel(rank: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = rank % 100;
    const suffix =
      v >= 11 && v <= 13 ? suffixes[0] : suffixes[v % 10] || suffixes[0];
    return `${rank}${suffix}`;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  messageApplicant(id: number) {
    this.router.navigate(['/employer/chats'], { queryParams: { id } });
  }

  viewApplicant(id: number, jobId: any) {
    this.router.navigate(['/employer/candidate'], {
      queryParams: { id, jobId },
    });
  }
}
