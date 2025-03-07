import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-emp-dashboard',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css'],
})
export class EmpDashboardComponent implements OnInit {
  companyName = 'TechCorp'; // Replace with dynamic data
  currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  metricsList = [
    { label: 'Active Jobs', value: 5, icon: 'fal fa-briefcase', link: '/jobs', color: 'text-blue-500' },
    { label: 'Applications', value: 42, icon: 'fal fa-users', link: '/candidates', color: 'text-green-500' },
    { label: 'Pending', value: 8, icon: 'fal fa-bell', link: '/candidates', color: 'text-yellow-500' },
  ];
  recentActivities = [
    { id: 1, message: 'New application for Software Engineer', timestamp: '2025-03-07 10:30 AM' },
    { id: 2, message: 'Candidate shortlisted for Data Analyst', timestamp: '2025-03-07 09:15 AM' },
    { id: 3, message: 'Job posting "UX Designer" activated', timestamp: '2025-03-06 03:45 PM' },
  ];

  ngOnInit() {
    console.log('Dashboard loaded for', this.companyName);
  }
}
