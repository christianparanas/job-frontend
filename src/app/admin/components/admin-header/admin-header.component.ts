import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

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
    // private authService: AuthService,
    // private profileService: ProfileService,
    // private notificationService: NotificationService,
    // private eventService: EventService,
    private router: Router // private toast: HotToastService
  ) {}

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
    {
      title: 'Notifications',
      route: 'notifications',
      icon: 'fal fa-info-circle',
    },
    {
      title: 'Settings',
      route: 'settings',
      icon: 'fal fa-info-circle',
    },
    {
      title: 'Audit Logs',
      route: 'logs',
      icon: 'fal fa-info-circle',
    },
    {
      title: 'Support/Help',
      route: 'help',
      icon: 'fal fa-info-circle',
    },
  ];

  ngOnInit(): void {
    this.getUser();
    window.addEventListener('scroll', this.listenScrollEvent);

    const route = this.route.snapshot.children[0].routeConfig?.path;
    route == '' ? (this.currentRoute = '/') : (this.currentRoute = route);
  }

  accountChangedPass() {
    // if (this.user.isPasswordChange == 0) {
    //   this.toast.info(
    //     'Please change your account password to access the restricted pages.'
    //   );
    //   this.router.navigate(['/account']);
    // }
  }

  getNotificationEvent() {
    // this.eventService.getNotificationEvent().subscribe((response: any) => {
    //   if (response.userId == this.user.id) {
    //     this.getNotifications();
    //   }
    // });
  }

  getNotifications() {
    // this.notificationService.getNotifications(this.user.id).subscribe(
    //   (response: any) => {
    //     this.notifications = response;
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
  }

  getUser() {
    //   this.profileService.getProfile().subscribe(
    //     (response: any) => {
    //       this.user = response;
    //       console.log(response);
    //       this.getNotifications();
    //       this.getNotificationEvent();
    //       this.accountChangedPass();
    //     },
    //     (error: any) => {
    //       console.log(error);
    //     }
    //   );
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
    // this.authService.logout('student');
    this.router.navigate(['/admin/login']);
  }

  listenScrollEvent = () => {
    window.scrollY > 15 ? (this.onScroll = true) : (this.onScroll = false);
  };
}
