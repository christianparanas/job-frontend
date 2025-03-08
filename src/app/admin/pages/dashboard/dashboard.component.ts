import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { AdminService } from '../../shared/services/admin.service'; // Import AdminService
import { HotToastService } from '@ngxpert/hot-toast';
import { AuthService } from '../../../core/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule,
    ToastModule,
    DropdownModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  stats = { totalUsers: 0, employers: 0, candidates: 0 };

  constructor(
    private authService: AuthService,
    private adminService: AdminService, // Use AdminService
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.loadStats();

    console.log(this.stats)
  }

  loadStats(): void {
    this.adminService.getUserStats().subscribe({
      next: (response) => this.stats = response,
      error: () => this.toast.error('Failed to load stats.'),
    });
  }
}
