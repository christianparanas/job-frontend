import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ChartModule],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  // Chart Data for Skill Progression Overview
  skillProgressData = {
    labels: ['Entry', 'Intermediate', 'Advanced'],
    datasets: [
      {
        label: 'User Skill Progression',
        data: [50, 80, 40], // Example data points
        backgroundColor: '#4CAF50', // Green color
      },
    ],
  };

  // Career Pathways
  careerPaths = ['Software Engineer', 'Project Manager', 'Data Scientist'];

  // Trending Skills
  trendingSkills = ['Python', 'SQL', 'Project Management', 'Machine Learning'];

  // Certifications Overview
  certificationsCount = 120;
  topCertifications = [
    'Certified Data Analyst',
    'AWS Certified Solutions Architect',
    'Google Data Engineer',
  ];

  // Recent Activity
  recentActivity = [
    'User completed Assessment 1',
    'User achieved Certification: Python Basics',
    'User started Assessment: Advanced SQL',
    'User joined the Data Science Pathway',
  ];

  // System Alerts
  systemAlerts = [
    'System Maintenance Scheduled for 12th Feb',
    'Assessment Feedback: Complete your assessments for certification eligibility',
    'New Course Added: Advanced Data Analytics',
  ];

  constructor() {}

  ngOnInit(): void {
    // You can fetch the data dynamically from an API here if needed.
    // This can be set up in the ngOnInit lifecycle hook.
  }

  // You can implement methods to handle user interactions like viewing more details, etc.
  viewMoreDetails(): void {
    console.log('User clicked on "View More Details"');
    // Implement action such as navigating to a detailed view or performing a specific task
  }
}
