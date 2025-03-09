import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { HotToastService } from '@ngxpert/hot-toast';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../shared/services/emp-job.service';
import { AuthService } from '../../../core/shared/services/auth.service';

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
    MenubarModule,
  ],
  standalone: true,
  templateUrl: './emp-jobs.component.html',
  styleUrls: ['./emp-jobs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpJobsComponent implements OnInit {
  jobs: any[] = [];
  selectedJobs: any[] = [];

  constructor(
    private jobService: JobService,
    private toast: HotToastService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getJobs().subscribe({
      next: (response) => {
        console.log('Jobs response:', response); // Debug
        if (Array.isArray(response)) {
          this.jobs = response.map((job) => ({
            ...job,
            actionItems: this.getActionItems(job),
          }));
        } else {
          console.error('Response is not an array:', response);
          this.jobs = [];
        }
        this.cdr.detectChanges(); // Trigger update
      },
      error: (err) => {
        console.error('Error loading jobs:', err);
        this.toast.error('Failed to load jobs.');
        this.jobs = [];
        this.cdr.detectChanges();
      },
    });
  }

  toggleStatus(job: any, newStatus: string): void {
    this.jobService.updateJobStatus(job.id, newStatus).subscribe({
      next: () => {
        job.status = newStatus;
        this.toast.success(`Updated ${job.title}'s status to ${newStatus}`);
        this.cdr.detectChanges();
      },
      error: () => this.toast.error('Failed to update job status.'),
    });
  }

  deleteJob(job: any): void {
    if (confirm(`Are you sure you want to delete ${job.title}?`)) {
      this.jobService.deleteJob(job.id).subscribe({
        next: () => {
          this.jobs = this.jobs.filter((j) => j.id !== job.id);
          this.toast.success(`Deleted job: ${job.title}`);
          this.cdr.detectChanges();
        },
        error: () => this.toast.error('Failed to delete job.'),
      });
    }
  }

  onGlobalFilter(table: Table, event: Event): void {
    const input = event.target as HTMLInputElement;
    table.filterGlobal(input.value, 'contains');
  }

  getActionItems(job: any): MenuItem[] {
    return [
      {
        label: '',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-pencil',
            routerLink: ['/employer/job/edit'],
            queryParams: { id: job.id },
          },
          {
            label: 'View',
            icon: 'pi pi-eye',
            routerLink: ['/employer/job/view'],
            queryParams: { id: job.id },
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => this.deleteJob(job),
            styleClass: 'text-red-500',
          },
        ],
      },
    ];
  }
}
