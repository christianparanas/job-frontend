import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-sidebar',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
})
export class AdminSidebarComponent implements OnInit {
  currentRoute: string = '/'; // Default to root

  routesArr: any = [
    {
      title: 'Dashboard',
      route: 'dashboard',
      icon: 'fal fa-tachometer-alt',
    },
    {
      title: 'User Management',
      route: 'users',
      icon: 'fal fa-users',
    },
    // {
    //   title: 'Jobs',
    //   route: 'jobs',
    //   icon: 'fal fa-briefcase',
    // },
    {
      title: 'Assessments',
      route: 'assessments',
      icon: 'fal fa-clipboard-check',
    },
    {
      title: 'Logs',
      route: 'logs',
      icon: 'fal fa-file-alt',
    },
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
    const routeSegment = fullPath.split('/admin/')[1] || ''; // Extract after '/employer/'
    this.currentRoute = routeSegment === '' ? '' : routeSegment; // Normalize root to ''
  }
}
