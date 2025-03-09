import { Component, OnInit } from '@angular/core';
import { JobService } from '../../shared/services/job.service';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { trigger, transition, style, animate } from '@angular/animations';
import { ProfileService } from '../../shared/services/profile.service';
import { AuthService } from '../../../core/shared/services/auth.service';

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: string;
  type: string;
  status: string;
  updatedAt: string;
  applications: number;
  employer: { firstname: string };
  JobRequirements: {
    skillId: number;
    proficiency: number;
    Skill: { name: string };
  }[];
}

@Component({
  selector: 'app-jobs',
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    BadgeModule,
    ButtonModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  standalone: true,
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class JobsComponent implements OnInit {
  user: any;
  jobs: Job[] = [];
  isLoading = false;
  expandedJob: number | null = null;
  appliedJobs: number[] = [];

  constructor(
    private authService: AuthService,
    private jobService: JobService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();

    this.isLoading = true;
    this.fetchJobs();
    this.fetchAppliedJobs();
  }

  fetchJobs(): void {
    this.jobService.getAlignedJobs().subscribe(
      (response) => {
        this.jobs = response;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching aligned jobs:', error);
        this.isLoading = false;
      }
    );
  }

  fetchAppliedJobs(): void {
    this.jobService.getAppliedJobs(this.user?.id).subscribe(
      (response) => {
        this.appliedJobs = response.map((candidate) => candidate.jobId);
      },
      (error) => console.error('Error fetching applied jobs:', error)
    );
  }

  getStatusStyle(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'p-badge-success';
      case 'draft':
        return 'p-badge-warning';
      case 'closed':
        return 'p-badge-danger';
      default:
        return 'p-badge-info';
    }
  }

  toggleExpand(jobId: number): void {
    this.expandedJob = this.expandedJob === jobId ? null : jobId;
  }

  confirmApply(jobId: number): void {
    if (this.appliedJobs.includes(jobId)) return;

    this.confirmationService.confirm({
      message: 'Are you sure you want to apply for this job?',
      accept: () => {
        this.apply(jobId);
      },
      reject: () => {
        console.log('Application cancelled');
      },
    });
  }

  apply(jobId: number): void {
    this.jobService.applyForJob(jobId, this.user?.id).subscribe({
      next: () => {
        console.log(`Applied to job ${jobId}`);
        this.appliedJobs.push(jobId);
        const job = this.jobs.find((j) => j.id === jobId);
        if (job) job.applications += 1;
      },
      error: (error) => console.error('Error applying to job:', error),
    });
  }
}
