import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isNavOpen: boolean = false;
  currentRoute: any;
  onScroll: boolean = false;
  user: any = [];
  defaultImg: any = 'admin.png';

  notifications: any = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router // private toast: HotToastService
  ) {}

  routesArr: any = [
    {
      title: 'Jobs',
      route: 'jobs',
      icon: 'fal fa-chart-line',
    },
    {
      title: 'Applications',
      route: 'applications',
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
