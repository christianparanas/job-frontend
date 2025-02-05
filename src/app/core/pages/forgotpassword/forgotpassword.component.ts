import { Component, OnInit } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../shared/services/auth.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-forgotpassword',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css',
})
export class ForgotpasswordComponent {
  email: string = '';
  submitLoading: boolean = false;
  isEmailSent: boolean = false;

  constructor(
    private location: Location,
    private authService: AuthService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {}

  isValidEmail(email: string) {
    // Regular expression for validating an email
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  onSubmit() {
    if (this.email == '' && !this.isValidEmail(this.email)) {
      this.toast.info('Please enter a valid email address');
    }

    // Start loading spinner
    this.submitLoading = true;

    // Call the forgot password service method
    this.authService.forgotPassword(this.email).subscribe(
      (response: any) => {
        // Handle successful response
        this.isEmailSent = true; // You can use this to show a success message or redirect to another page
        this.submitLoading = false;
      },
      (err: any) => {
        // Handle error response
        this.submitLoading = false;
        this.toast.error(
          err.error.message || 'Something went wrong. Please try again.'
        );
      }
    );
  }
}
