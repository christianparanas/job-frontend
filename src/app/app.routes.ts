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

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },

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
  { path: 'admin/login', component: AuthComponent },
  { path: 'admin/', component: DashboardComponent },
];
