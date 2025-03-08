

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
      icon: 'fal fa-chart-line',
    },
    {
      title: 'User Management',
      route: 'users',
      icon: 'fal fa-box-ballot',
    },
    // {
    //   title: 'Reports',
    //   route: 'reports',
    //   icon: 'fal fa-retweet',
    // },
    {
      title: 'Settings',
      route: 'settings',
      icon: 'fal fa-info-circle',
    },
    {
      title: 'Logs',
      route: 'logs',
      icon: 'fal fa-info-circle',
    },
    {
      title: 'Tickets',
      route: 'tickets',
      icon: 'fal fa-info-circle',
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
