import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-sidebar',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css',
})
export class AdminSidebarComponent {
  currentRoute: any;

  routesArr: any = [
    {
      title: 'Dashboard',
      route: '/',
      icon: 'fal fa-chart-line',
    },
    {
      title: 'User Management',
      route: 'users',
      icon: 'fal fa-box-ballot',
    },
    {
      title: 'Reports',
      route: 'reports',
      icon: 'fal fa-retweet',
    },
    // {
    //   title: 'Notifications',
    //   route: 'notifications',
    //   icon: 'fal fa-info-circle',
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCurrentRouteURL(this.route.snapshot.children[0].routeConfig?.path);
  }

  getCurrentRouteURL(route: any) {
    route == '' ? (this.currentRoute = '/') : (this.currentRoute = route);
  }
}
