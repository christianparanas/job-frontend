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
// Add missing components
import { EmpApplicantsComponent } from './employer/pages/emp-applicants/emp-applicants.component';
import { EmpCandidateComponent } from './employer/pages/emp-candidate/emp-candidate.component';
import { EmpJobComponent } from './employer/pages/emp-job/emp-job.component';
import { EmpCreateJobComponent } from './employer/pages/emp-create-job/emp-create-job.component';
import { EmpEditJobComponent } from './employer/pages/emp-edit-job/emp-edit-job.component';
import { ChatsComponent } from './seeker/pages/chats/chats.component';
import { EmpChatsComponent } from './employer/pages/emp-chats/emp-chats.component';
import { EmpChatComponent } from './employer/pages/emp-chat/emp-chat.component';
import { EmpViewJobComponent } from './employer/pages/emp-view-job/emp-view-job.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'account-verified', component: AccountVerifiedComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: JobsComponent },
      { path: 'assessment', component: AssessmentComponent },
      { path: 'me', component: MeComponent },
      { path: 'pathway', component: PathwayComponent },
      { path: 'chats', component: ChatsComponent },
      { path: 'about', component: AboutComponent },
    ],
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
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
    children: [
      { path: 'dashboard', component: EmpDashboardComponent }, // '/employer'
      { path: 'jobs', component: EmpJobsComponent },  // '/employer/jobs'
      { path: 'chats', component: EmpChatsComponent },  // '/employer/jobs'
      { path: 'chat', component: EmpChatComponent },  // '/employer/jobs'
      { path: 'candidates', component: EmpApplicantsComponent }, // Add this
      { path: 'candidate', component: EmpCandidateComponent }, // Add this
      { path: 'job', component: EmpJobComponent }, // Add this
      { path: 'job/create', component: EmpCreateJobComponent }, // Add this
      { path: 'job/edit', component: EmpEditJobComponent }, // Add this
      { path: 'job/view', component: EmpViewJobComponent }, // Add this
    ],
  },
  { path: 'employer/auth', component: EmpAuthComponent },
  { path: 'admin/auth', component: AuthComponent },
];
