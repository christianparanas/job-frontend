import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/shared/services/auth.service';

@Component({
  selector: 'app-emp-header',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './emp-header.component.html',
  styleUrl: './emp-header.component.css',
})
export class EmpHeaderComponent {
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

  routesArr = [
    { title: 'Dashboard', route: 'dashboard', icon: 'fal fa-chart-line' }, // '' maps to '/employer'
    { title: 'Job Postings', route: 'jobs', icon: 'fal fa-briefcase' },
    { title: 'Candidates', route: 'candidates', icon: 'fal fa-users' },
    { title: 'Chat', route: 'chats', icon: 'fal fa-comment' },
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
