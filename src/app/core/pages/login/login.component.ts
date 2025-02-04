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

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private authService: AuthService, // Inject the UserService
    private toast: HotToastService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    // Call the login method from UserService
    this.authService.login(loginData).subscribe(
      (response) => {
        console.log('Login successful', response);

        this.toast.success('Login successful');
        // You can redirect the user to the dashboard or home page after successful login
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login error', error);
        this.toast.error('Invalid Email or Password');
        // Handle the error, show a message to the user
      }
    );
  }
}
