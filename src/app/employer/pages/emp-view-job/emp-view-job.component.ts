import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';

interface Job {
  id: number;
  title: string;
  description: string;
  requirements: { skill: string; proficiency: number }[];
  location: string;
  salary: string;
  type: string;
  status: string;
  postedDate: string;
  applications: number;
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

  // Mock job and applicant data (replace with API calls in a real app)
  private mockJobs: Job[] = [
    {
      id: 1,
      title: 'Software Engineer',
      description: 'Develop and maintain web applications using Angular and Node.js. Collaborate with the team to deliver high-quality software solutions.',
      requirements: [
        { skill: 'Agile Software Development', proficiency: 3 },
        { skill: 'Applications Development', proficiency: 4 },
        { skill: 'Data Analytics', proficiency: 2 },
      ],
      location: 'Remote',
      salary: '$100,000 - $120,000',
      type: 'Full-time',
      status: 'Active',
      postedDate: '2025-03-07',
      applications: 3,
    },
  ];

  private mockApplicants: Applicant[] = [
    { id: 1, name: 'John Doe', appliedDate: '2025-03-08' },
    { id: 2, name: 'Jane Smith', appliedDate: '2025-03-09' },
    { id: 3, name: 'Alex Brown', appliedDate: '2025-03-10' },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // const jobId = this.route.snapshot.paramMap.get('id');
    const jobId = 1;
    this.job = this.mockJobs.find((j) => j.id === Number(jobId)) || null;
    if (this.job) {
      this.applicants = this.mockApplicants; // In a real app, fetch applicants for this job
    }
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

  getProficiencyLabel(proficiency: number): string {
    switch (proficiency) {
      case 1: return 'Basic';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      case 4: return 'Expert';
      default: return 'Unknown';
    }
  }

  messageApplicant(applicantId: number) {
    // Navigate to Chats page with applicant pre-selected (e.g., via query param)
    this.router.navigate(['/employer/chats'], { queryParams: { applicantId } });
  }
}
