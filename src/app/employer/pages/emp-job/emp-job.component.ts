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
  private jobs = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.job = this.jobs.find((j: any) => j.id === Number(id)) || {
      id: id,
      title: 'Unknown Job',
      status: 'Draft',
    };
  }

  toggleStatus(newStatus: string) {
    this.job.status = newStatus;
    // Add API call here
  }

  deleteJob() {
    window.history.back();
  }
}
