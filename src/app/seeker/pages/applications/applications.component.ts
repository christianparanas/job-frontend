import { Component, OnInit } from '@angular/core';
import { JobService } from '../../shared/services/job.service';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from '../../../core/shared/services/auth.service';

interface Application {
  id: number;
  jobId: number;
  appliedDate: string;
  Job: {
    id: number;
    title: string;
    status: string;
    employer: { name: string };
    location?: string;
    salary?: string;
    type?: string;
  };
}

@Component({
  selector: 'app-applications',
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    ButtonModule,
    BadgeModule,
    ConfirmDialogModule,
    TableModule,
  ],
  providers: [ConfirmationService],
  standalone: true,
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css'],
})
export class ApplicationsComponent implements OnInit {
  applications: Application[] = [];
  isLoading = false;
  user: any;

  constructor(
    private authService: AuthService,
    private jobService: JobService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.fetchUserApplications();
  }

  fetchUserApplications(): void {
    this.isLoading = true;
    this.jobService.getAppliedJobs(this.user?.id).subscribe({
      next: (response) => {

        this.applications = response.map((app) => ({
          id: app.id,
          jobId: app.jobId,
          appliedDate: app.appliedDate,
          status: app.status,
          Job: {
            id: app.Job.id,
            title: app.Job.title,
            status: app.Job.status,
            employer: { name: app.Job.employer.firstname },
            location: app.Job.location,
            salary: app.Job.salary,
            type: app.Job.type,
          },
        }));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching user applications:', error);
        this.applications = [];
        this.isLoading = false;
      },
    });
  }

  getStatusStyle(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'p-badge-success';
      case 'draft':
        return 'p-badge-warning';
      case 'closed':
        return 'p-badge-danger';
      default:
        return 'p-badge-info';
    }
  }

  confirmWithdraw(candidateId: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to withdraw this application?',
      accept: () => {
        this.withdrawApplication(candidateId);

      },
      reject: () => {
        console.log('Withdrawal cancelled');
      },
    });
  }

  withdrawApplication(candidateId: number): void {
    this.jobService.withdrawApplication(candidateId).subscribe({
      next: () => {
        console.log(`Withdrawn application ${candidateId}`);
        this.applications = this.applications.filter(
          (app) => app.id !== candidateId
        );
      },
      error: (error) => console.error('Error withdrawing application:', error),
    });
  }
}
