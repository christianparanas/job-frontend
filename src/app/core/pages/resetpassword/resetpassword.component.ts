import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resetpassword',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe((value) => {
    //   (this.token = value.token), (this.userId = value.id);
    // });

    if (this.token == null && this.userId == null) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.password != this.confirmPassword)
      // return this.toast.error("Password didn't matched.");

      this.submitLoading = true;

    const data = {
      token: this.token,
      password: this.password,
      userId: this.userId,
    };

    // this.authService.resetpassword(data).subscribe(
    //   (response: any) => {
    //     this.submitLoading = false;
    //     this.toast.success(response.message);

    //     this.router.navigate([`/login`], {
    //       queryParams: { type: 'student' },
    //     });
    //   },
    //   (err: any) => {
    //     this.submitLoading = false;
    //     this.toast.error(err.error.message);
    //   }
    // );
  }
}
