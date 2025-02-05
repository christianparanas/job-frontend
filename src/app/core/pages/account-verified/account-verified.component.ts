import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-verified',
  imports: [ButtonModule, FormsModule, RouterModule, CommonModule],
  standalone: true,
  templateUrl: './account-verified.component.html',
  styleUrl: './account-verified.component.css',
})
export class AccountVerifiedComponent {}
