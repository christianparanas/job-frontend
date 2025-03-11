import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { JobService } from '../../shared/services/emp-job.service'; // Adjust path
import { AuthService } from '../../../core/shared/services/auth.service'; // Adjust path
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
        // Map backend response to Job interface
        console.log(response);

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
          updatedAt: response.updatedAt || response.createdAt, // Fallback to createdAt if needed
          applications: response.Candidates,
        };

        console.log(response);
        // Fetch applicants if not included in job response
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
        console.log(response);

        this.applicants = response.map((applicant: any) => ({
          id: applicant.id,
          name:
            applicant.applicant?.firstname +
            ' ' +
            applicant.applicant?.lastname,
          appliedDate: applicant.appliedDate || applicant.createdAt, // Adjust based on backend
        }));
      },
      error: (err) => {
        console.error('Error loading applicants:', err);
        this.applicants = [];
        this.toast.error('Failed to load applicants.');
      },
    });
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

  // getProficiencyLabel(proficiency: number): string {
  //   switch (proficiency) {
  //     case 1:
  //       return 'Basic';
  //     case 2:
  //       return 'Intermediate';
  //     case 3:
  //       return 'Advanced';
  //     case 4:
  //       return 'Expert';
  //     default:
  //       return 'Unknown';
  //   }
  // }

  messageApplicant(id: number) {
    this.router.navigate(['/employer/chats'], { queryParams: { id } });
  }

  viewApplicant(id: number, jobId: any) {
    this.router.navigate(['/employer/candidate'], {
      queryParams: { id, jobId },
    });
  }
}
