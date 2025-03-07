import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emp-sidebar',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './emp-sidebar.component.html',
  styleUrls: ['./emp-sidebar.component.css'],
})
export class EmpSidebarComponent implements OnInit {
  currentRoute: string = '/'; // Default to root

  routesArr = [
    { title: 'Dashboard', route: 'dashboard', icon: 'fal fa-chart-line' }, // '' maps to '/employer'
    { title: 'Job Postings', route: 'jobs', icon: 'fal fa-briefcase' },
    { title: 'Candidates', route: 'candidates', icon: 'fal fa-users' },
    { title: 'Chat', route: 'chats', icon: 'fal fa-life-ring' },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Initial route setup
    this.updateCurrentRoute();

    // Subscribe to route changes
    this.router.events.subscribe(() => {
      this.updateCurrentRoute();
    });
  }

  updateCurrentRoute() {
    const fullPath = this.router.url; // e.g., '/employer/jobs'
    const routeSegment = fullPath.split('/employer/')[1] || ''; // Extract after '/employer/'
    this.currentRoute = routeSegment === '' ? '' : routeSegment; // Normalize root to ''
  }
}
