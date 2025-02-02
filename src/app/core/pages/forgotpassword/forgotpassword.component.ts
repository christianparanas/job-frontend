import { Component, OnInit } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-forgotpassword',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css',
})
export class ForgotpasswordComponent {
  form: FormGroup;
  submitLoading: boolean = false;
  isEmailSent: boolean = false;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    // if(!this.form.valid) return this.toast.info("Please enter a valid email address")

    this.submitLoading = true;

    // this.authService.forgotpassword(this.form.value).subscribe((response: any) => {
    //   this.isEmailSent = true
    //   this.submitLoading = false
    // },
    // (err: any) => {
    //   this.submitLoading = false
    //   this.toast.error(err.error.message)
    // })
  }

  goBack() {
    this.location.back();
  }
}
