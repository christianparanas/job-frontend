import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-emp-candidate',
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    DropdownModule,
    CardModule,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './emp-candidate.component.html',
  styleUrls: ['./emp-candidate.component.css'],
})
export class EmpCandidateComponent implements OnInit {
  candidate: any = {};
  statusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Shortlisted', value: 'Shortlisted' },
    { label: 'Rejected', value: 'Rejected' },
  ];

  // Sample data (replace with API call)
  private candidates = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      job: 'Software Engineer',
      status: 'Pending',
      appliedDate: '2025-03-07',
      skills: ['JavaScript', 'Angular', 'Node.js'],
      experience: '5 years',
      education: 'B.S. Computer Science, XYZ University',
      resumeUrl: 'https://example.com/resumes/john_doe.pdf',
      notes: 'Strong technical skills, great interview performance.',
    },
    // Add more candidates as needed
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.candidate = this.candidates.find(c => c.id === Number(id)) || {
      id: id,
      name: 'Unknown Candidate',
      status: 'Pending',
    };
  }

  toggleStatus(newStatus: string) {
    this.candidate.status = newStatus;
    console.log(`Updated ${this.candidate.name}'s status to ${newStatus}`);
    // Add API call here
  }

  downloadResume() {
    window.open(this.candidate.resumeUrl, '_blank');
    console.log(`Downloading resume for ${this.candidate.name}`);
  }
}
