import { ReactiveFormsModule } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { FocusTrapModule } from 'primeng/focustrap';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AutoFocusModule } from 'primeng/autofocus';
import { PasswordModule } from 'primeng/password';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    PasswordModule,
    ReactiveFormsModule,
    InputTextModule,
    RouterLink,
    FocusTrapModule,
    ButtonModule,
    FormsModule,
    CheckboxModule,
    IconFieldModule,
    InputIconModule,
    AutoFocusModule,
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loading: boolean = false; // Add loading state

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private authService: AuthService, // Inject the UserService
    private toast: HotToastService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true; // Set loading to true when submission starts

    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.toast.success('Login successful!');
        const role = this.authService.getUserRole();

        switch (role) {
          case 'User':
            this.router.navigate(['/jobs']);
            break;
          case 'Employer':
            this.router.navigate(['/employer/dashboard']);
            break;
          case 'Admin':
            this.router.navigate(['/admin/dashboard']);
            break;
          default:
            this.router.navigate(['/']);
        }
        this.loading = false; // Reset loading state on success
      },
      error: (error) => {
        console.error('Login failed', error);
        this.toast.error(
          error.error?.message || 'Login failed. Please try again.'
        );
        this.loading = false; // Reset loading state on error
      },
    });
  }
}
