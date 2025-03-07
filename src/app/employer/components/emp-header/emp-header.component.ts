import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

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
    // private authService: AuthService,
    // private profileService: ProfileService,
    // private notificationService: NotificationService,
    // private eventService: EventService,
    private router: Router // private toast: HotToastService
  ) {}

  routesArr = [
    { title: 'Dashboard', route: 'dashboard', icon: 'fal fa-chart-line' }, // '' maps to '/employer'
    { title: 'Job Postings', route: 'jobs', icon: 'fal fa-briefcase' },
    { title: 'Candidates', route: 'candidates', icon: 'fal fa-users' },
    { title: 'Chat', route: 'chats', icon: 'fal fa-comment' },
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

