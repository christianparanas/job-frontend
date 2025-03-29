// emp-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';
import { EmployerDashboardService } from '../../shared/services/emp-dash.service';

@Component({
  selector: 'app-emp-dashboard',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css'],
})
export class EmpDashboardComponent implements OnInit {
  companyName: string = 'TechCorp'; // Fallback value (replace with actual data from user session or API)
  currentDate: string = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  metricsList: any[] = [];
  recentActivities: any[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  employerName = '';

  constructor(private dashboardService: EmployerDashboardService) {}

  ngOnInit() {
    this.fetchDashboardData();
  }

  fetchDashboardData() {
    this.isLoading = true;
    this.errorMessage = null;

    this.dashboardService
      .getDashboardData()
      .pipe(
        catchError((error) => {
          this.errorMessage =
            'Failed to load dashboard data. Please try again later.';
          this.isLoading = false;
          return of(null);
        })
      )
      .subscribe((data) => {
        if (data.length != 0) {

          this.employerName = data[0].employer.firstname;
          // Process the server data to populate metrics and recent activities
          this.processDashboardData(data);
        } else {
          // Fallback data if API returns null
          this.metricsList = [
            {
              label: 'Active Jobs',
              value: 0,
              icon: 'pi pi-briefcase',
              link: '/employer/jobs',
              color: 'text-blue-500',
            },
            {
              label: 'Applications',
              value: 0,
              icon: 'pi pi-users',
              link: '/employer/candidates',
              color: 'text-green-500',
            },
          ];
          this.recentActivities = [];
        }
        this.isLoading = false;
      });
  }

  processDashboardData(jobs: any[]) {
    // Calculate Active Jobs (jobs with status "Active")
    const activeJobsCount = jobs.filter(
      (job) => job.status === 'Active'
    ).length;

    // Calculate total Applications (total candidates across all jobs)
    const totalApplications = jobs.reduce(
      (count, job) => count + (job.Candidates?.length || 0),
      0
    );

    // Populate metricsList
    this.metricsList = [
      {
        label: 'Active Jobs',
        value: activeJobsCount,
        icon: 'pi pi-briefcase',
        link: '/employer/jobs',
        color: 'text-blue-500',
      },
      {
        label: 'Applications',
        value: totalApplications,
        icon: 'pi pi-users',
        link: '/employer/candidates',
        color: 'text-green-500',
      },
    ];

    // Populate recentActivities from Candidates
    this.recentActivities = [];
    jobs.forEach((job) => {
      if (job.Candidates && job.Candidates.length > 0) {
        job.Candidates.forEach((candidate: any) => {
          // Check if candidate.applicant exists and has firstname/lastname
          const applicantName =
            candidate.applicant &&
            candidate.applicant.firstname &&
            candidate.applicant.lastname
              ? `${candidate.applicant.firstname} ${candidate.applicant.lastname}`
              : 'Unknown Applicant';

          const activity = {
            id: candidate.id,
            message: `${applicantName} applied for ${job.title}`,
            timestamp: new Date(candidate.appliedDate).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
          };
          this.recentActivities.push(activity);
        });
      }
    });

    // Sort recent activities by appliedDate (most recent first)
    this.recentActivities.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }
}
