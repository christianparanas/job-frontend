import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { HotToastService } from '@ngxpert/hot-toast';
import { AuthService } from '../../shared/services/auth.service';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-resetpassword',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
  ],
  standalone: true,
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css',
})
export class ResetpasswordComponent implements OnInit {
  token: any = null;
  userId: any = null;
  password: any = null;
  confirmPassword: any = null;

  submitLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: HotToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((value) => {
      this.token = value['token'];
    });

    if (this.token == null) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (this.password != this.confirmPassword) {
      this.toast.error("Password didn't matched.");
      return;
    }

    this.submitLoading = true;

    const data = {
      token: this.token,
      password: this.password,
    };

    // Call the forgot password service method
    this.authService.resetPassword(data).subscribe(
      (response: any) => {
        // Handle successful response
        this.submitLoading = false;
        this.toast.success(response.message);

        this.router.navigate([`/login`]);
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
