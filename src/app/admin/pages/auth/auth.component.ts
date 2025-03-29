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

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    PasswordModule,
    ReactiveFormsModule,
    InputTextModule,
    FocusTrapModule,
    ButtonModule,
    FormsModule,
    CheckboxModule,
    IconFieldModule,
    InputIconModule,
    AutoFocusModule,
  ],
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
  ) {}

  ngOnInit(): void {}

  onSubmit() {
  }
}
