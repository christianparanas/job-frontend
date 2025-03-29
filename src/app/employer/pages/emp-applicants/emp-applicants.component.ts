import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Table } from 'primeng/table';
import { HotToastService } from '@ngxpert/hot-toast';
import { forkJoin } from 'rxjs';
import { CandidateService } from '../../shared/services/emp-candidate.service';
import { AuthService } from '../../../core/shared/services/auth.service';

@Component({
  selector: 'app-emp-applicants',
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
  templateUrl: './emp-applicants.component.html',
  styleUrls: ['./emp-applicants.component.css'],
})
export class EmpApplicantsComponent implements OnInit {
  candidates: any[] = [];
  statusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Shortlisted', value: 'Shortlisted' },
    { label: 'Rejected', value: 'Rejected' },
  ];
  employerId: number = 0;

  selectedCandidates: any[] = [];

  @ViewChild('dt') dt!: Table;

  constructor(
    private candidateService: CandidateService,
    private toast: HotToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.employerId = this.authService.getUser()?.id;
    this.loadCandidates();
  }

  loadCandidates(): void {
    this.candidateService
      .getAllCandidatesForEmployerJobs(this.employerId)
      .subscribe({
        next: (candidates: any) => {
          this.candidates = candidates.flatMap((job: any) =>
            job.Candidates.map((candidate: any) => ({
              candidateId: candidate.id,
              name:
                candidate.applicant.firstname +
                ' ' +
                candidate.applicant.lastname,
              job: job.title,
              jobId: job.id,
              status: candidate.status || 'Pending',
              appliedDate: this.formatDate(candidate.appliedDate),
            }))
          );

        },
        error: (err: any) => {
          console.error('Error loading candidates:', err);
          this.toast.error('Failed to load candidates.');
        },
      });
  }

  toggleStatus(candidate: any, newStatus: string) {
    candidate.status = newStatus;
    // Add API call to update status (e.g., candidateService.updateCandidateStatus)
  }

  exportCSV() {
    const csv = this.candidates
      .map((c) => `${c.name},${c.job},${c.status},${c.appliedDate}`)
      .join('\n');
    const blob = new Blob([`Name,Job Applied,Status,Applied Date\n${csv}`], {
      type: 'text/csv',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'candidates.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  onGlobalFilter(table: Table, event: Event) {
    const input = event.target as HTMLInputElement;
    table.filterGlobal(input.value, 'contains');
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
