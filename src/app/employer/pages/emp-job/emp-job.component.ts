import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-emp-job',
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './emp-job.component.html',
  styleUrls: ['./emp-job.component.css'],
})
export class EmpJobComponent implements OnInit {
  job: any = {};
  statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Draft', value: 'Draft' },
    { label: 'Closed', value: 'Closed' },
  ];

  // Sample data (replace with API call)
  private jobs = [
    {
      id: 1,
      title: 'Software Engineer',
      status: 'Active',
      applications: 15,
      postedDate: '2025-03-01',
      description: 'Develop and maintain web applications using modern JavaScript frameworks.',
      requirements: ['5+ years experience', 'Proficiency in Angular', 'Strong problem-solving skills'],
      location: 'Remote',
      salary: '$100,000 - $120,000',
      type: 'Full-time',
    },
    {
      id: 2,
      title: 'Data Analyst',
      status: 'Draft',
      applications: 0,
      postedDate: '2025-02-28',
      description: 'Analyze data to provide actionable insights for business decisions.',
      requirements: ['3+ years experience', 'SQL expertise', 'Experience with BI tools'],
      location: 'New York, NY',
      salary: '$80,000 - $100,000',
      type: 'Full-time',
    },
    // Add more jobs as needed
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.job = this.jobs.find(j => j.id === Number(id)) || {
      id: id,
      title: 'Unknown Job',
      status: 'Draft',
    };
  }

  toggleStatus(newStatus: string) {
    this.job.status = newStatus;
    console.log(`Updated ${this.job.title}'s status to ${newStatus}`);
    // Add API call here
  }

  deleteJob() {
    console.log(`Deleted job: ${this.job.title}`);
    // Add API call here, then navigate back
    window.history.back();
  }
}
