import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-emp-jobs',
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './emp-jobs.component.html',
  styleUrls: ['./emp-jobs.component.css'],
})
export class EmpJobsComponent {
  jobs = [
    { id: 1, title: 'Software Engineer', status: 'Active', applications: 15, postedDate: '2025-03-01' },
    { id: 2, title: 'Data Analyst', status: 'Draft', applications: 0, postedDate: '2025-02-28' },
    { id: 3, title: 'UX Designer', status: 'Closed', applications: 8, postedDate: '2025-02-15' },
    { id: 4, title: 'Product Manager', status: 'Active', applications: 10, postedDate: '2025-03-05' },
    { id: 5, title: 'DevOps Engineer', status: 'Active', applications: 12, postedDate: '2025-03-03' },
  ];

  statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Draft', value: 'Draft' },
    { label: 'Closed', value: 'Closed' },
  ];

  selectedJobs: any[] = [];

  toggleStatus(job: any, newStatus: string) {
    job.status = newStatus;
    console.log(`Updated ${job.title}'s status to ${newStatus}`);
    // Add API call here
  }

  deleteJob(job: any) {
    this.jobs = this.jobs.filter(j => j.id !== job.id);
    console.log(`Deleted job: ${job.title}`);
    // Add API call here
  }

  onGlobalFilter(table: Table, event: Event) {
    const input = event.target as HTMLInputElement;
    table.filterGlobal(input.value, 'contains');
  }
}
