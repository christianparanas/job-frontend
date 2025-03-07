import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  currentRoute: string = '/'; // Default to root

  routesArr: any = [
    {
      title: 'Jobs',
      route: '/',
      icon: 'fal fa-chart-line',
    },
    {
      title: 'Assessment',
      route: 'assessment',
      icon: 'fal fa-box-ballot',
    },
    {
      title: 'Pathway',
      route: 'pathway',
      icon: 'fal fa-retweet',
    },
    {
      title: 'Chat',
      route: 'chats',
      icon: 'fal fa-comment',
    },
    {
      title: 'About',
      route: 'about',
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
    const routeSegment = fullPath.split('/')[1] || ''; // Extract after '/employer/'
    this.currentRoute = routeSegment === '' ? '' : routeSegment; // Normalize root to ''
  }
}
