import { Routes } from '@angular/router';
import { LoginComponent } from './core/pages/login/login.component';
import { SignupComponent } from './core/pages/signup/signup.component';
import { ForgotpasswordComponent } from './core/pages/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './core/pages/resetpassword/resetpassword.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { JobsComponent } from './seeker/pages/jobs/jobs.component';
import { AssessmentComponent } from './seeker/pages/assessment/assessment.component';
import { MeComponent } from './seeker/pages/me/me.component';
import { PathwayComponent } from './seeker/pages/pathway/pathway.component';
import { AboutComponent } from './seeker/pages/about/about.component';
import { AuthComponent } from './admin/pages/auth/auth.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { AdminLayoutComponent } from './admin/components/admin-layout/admin-layout.component';
import { UsersComponent } from './admin/pages/users/users.component';
import { SettingsComponent } from './admin/pages/settings/settings.component';
import { ReportsComponent } from './admin/pages/reports/reports.component';
import { LogsComponent } from './admin/pages/logs/logs.component';
import { NotificationsComponent } from './admin/pages/notifications/notifications.component';
import { TicketsComponent } from './admin/pages/tickets/tickets.component';
import { ProfileComponent } from './admin/pages/profile/profile.component';
import { AccountVerifiedComponent } from './core/pages/account-verified/account-verified.component';
import { EmpLayoutComponent } from './employer/components/emp-layout/emp-layout.component';
import { EmpDashboardComponent } from './employer/pages/emp-dashboard/emp-dashboard.component';
import { EmpAuthComponent } from './employer/pages/emp-auth/emp-auth.component';
import { EmpJobsComponent } from './employer/pages/emp-jobs/emp-jobs.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'account-verified', component: AccountVerifiedComponent },

  {
    path: '',
    component: LayoutComponent,
    // canActivate: [StudentGuard],
    children: [
      { path: '', component: JobsComponent },
      { path: 'assessment', component: AssessmentComponent },
      { path: 'me', component: MeComponent },
      { path: 'pathway', component: PathwayComponent },
      { path: 'about', component: AboutComponent },
    ],
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    // canActivate: [StudentGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'tickets', component: TicketsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'logs', component: LogsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'users', component: UsersComponent },
    ],
  },

  {
    path: 'employer',
    component: EmpLayoutComponent,
    // canActivate: [StudentGuard],
    children: [
      { path: '', component: EmpDashboardComponent },
      { path: 'jobs', component: EmpJobsComponent },
    ],
  },
  { path: 'employer/auth', component: EmpAuthComponent },
  { path: 'admin/auth', component: AuthComponent },
];
