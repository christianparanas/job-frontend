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
export class EmpApplicantsComponent {
  candidates = [
    { id: 1, name: 'John Doe', job: 'Software Engineer', status: 'Pending', appliedDate: '2025-03-07' },
    { id: 2, name: 'Jane Smith', job: 'Data Analyst', status: 'Shortlisted', appliedDate: '2025-03-06' },
    { id: 3, name: 'Alex Johnson', job: 'UX Designer', status: 'Rejected', appliedDate: '2025-03-05' },
    { id: 4, name: 'Maria Lee', job: 'Product Manager', status: 'Pending', appliedDate: '2025-03-04' },
    { id: 5, name: 'Tom Brown', job: 'DevOps Engineer', status: 'Shortlisted', appliedDate: '2025-03-03' },
  ];

  statusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Shortlisted', value: 'Shortlisted' },
    { label: 'Rejected', value: 'Rejected' },
  ];

  selectedCandidates: any[] = [];

  toggleStatus(candidate: any, newStatus: string) {
    candidate.status = newStatus;
    console.log(`Updated ${candidate.name}'s status to ${newStatus}`);
    // Add API call here
  }

  exportCSV() {
    const csv = this.candidates.map(c => `${c.name},${c.job},${c.status},${c.appliedDate}`).join('\n');
    const blob = new Blob([`Name,Job Applied,Status,Applied Date\n${csv}`], { type: 'text/csv' });
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
}
