import { PasswordModule } from 'primeng/password';
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

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  ],
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  accept: boolean = false;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private authService: AuthService, // Inject the AuthService
    private toast: HotToastService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    // Check if the user accepted the terms and conditions
    if (!this.accept) {
      this.toast.info('You must accept the terms and conditions.');
      return;
    }

    // Call the signup service method
    const signupData = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
    };

    this.authService.signup(signupData).subscribe(
      (response) => {
        // Handle success response
        this.toast.info(response.message, {
          autoClose: false,
          dismissible: true,
          icon: '❎',
        });
        // Redirect the user or show a success message
        this.router.navigate(['/login']); // Example of navigating to login page
      },
      (error) => {
        // Handle error response
        console.error('Signup failed', error);
        // Show error message or handle accordingly
      }
    );
  }
}
