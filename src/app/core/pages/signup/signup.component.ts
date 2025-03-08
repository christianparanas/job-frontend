import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FocusTrapModule } from 'primeng/focustrap';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AutoFocusModule } from 'primeng/autofocus';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AuthService } from '../../shared/services/auth.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-signup',
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
    RadioButtonModule,
  ],
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  firstname: string = ''; // Company Name for employers
  lastname: string = ''; // Optional for employers
  email: string = '';
  password: string = '';
  accept: boolean = false;
  role: string = 'candidate'; // Default to candidate

  constructor(
    public router: Router,
    private authService: AuthService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.accept) {
      this.toast.info('You must accept the terms and conditions.');
      return;
    }

    const signupData = {
      email: this.email,
      password: this.password,
      firstname: this.firstname,
      lastname: this.role === 'candidate' ? this.lastname : null, // Null for employers
      role: this.role === 'candidate' ? 'User' : 'Employer', // Map to backend role names
    };

    this.authService.signup(signupData).subscribe(
      (response) => {
        this.toast.info(response.message, {
          autoClose: false,
          dismissible: true,
          icon: '✅',
        });
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Signup failed', error);
        this.toast.error(error.error?.message || 'Signup failed. Please try again.');
      }
    );
  }
}
