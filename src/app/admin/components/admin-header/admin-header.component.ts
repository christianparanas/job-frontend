import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/shared/services/auth.service';

@Component({
  selector: 'app-admin-header',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css',
})
export class AdminHeaderComponent {
  isNavOpen: boolean = false;
  currentRoute: any;
  onScroll: boolean = false;
  user: any = [];
  defaultImg: any = 'admin.png';

  notifications: any = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

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

  ngOnInit(): void {
    window.addEventListener('scroll', this.listenScrollEvent);

    const route = this.route.snapshot.children[0].routeConfig?.path;
    route == '' ? (this.currentRoute = '/') : (this.currentRoute = route);
  }

  getCurrentRouteURL(route: any) {
    route == '' ? (this.currentRoute = '/') : (this.currentRoute = route);
  }

  openCloseNavOverlay() {
    if (this.isNavOpen) {
      this.isNavOpen = false;
      return;
    }

    this.isNavOpen = true;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  listenScrollEvent = () => {
    window.scrollY > 15 ? (this.onScroll = true) : (this.onScroll = false);
  };
}
