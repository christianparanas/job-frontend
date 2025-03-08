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
  users: any[] = [];
  stats = { totalUsers: 0, employers: 0, candidates: 0 };
  roleOptions = [
    { label: 'User', value: 'User' },
    { label: 'Employer', value: 'Employer' },
    { label: 'Admin', value: 'Admin' },
  ];

  constructor(
    private authService: AuthService,
    private adminService: AdminService, // Use AdminService
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadStats();
  }


  loadUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next: (response) => this.users = response,
      error: () => this.toast.error('Failed to load users.'),
    });
  }

  loadStats(): void {
    this.adminService.getUserStats().subscribe({
      next: (response) => this.stats = response,
      error: () => this.toast.error('Failed to load stats.'),
    });
  }

  toggleVerification(user: any): void {
    const updatedStatus = !user.isVerified;
    this.adminService.toggleUserVerification(user.id, updatedStatus).subscribe({
      next: () => {
        user.isVerified = updatedStatus;
        this.toast.success(`User ${user.username} verification status updated.`);
      },
      error: () => this.toast.error('Failed to update verification status.'),
    });
  }

  deleteUser(user: any): void {
    if (confirm(`Are you sure you want to delete ${user.username}?`)) {
      this.adminService.deleteUser(user.id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id);
          this.loadStats(); // Refresh stats
          this.toast.success(`User ${user.username} deleted.`);
        },
        error: () => this.toast.error('Failed to delete user.'),
      });
    }
  }

  updateUserRole(user: any, newRole: string): void {
    this.adminService.updateUserRole(user.id, newRole).subscribe({
      next: () => {
        user.role = newRole;
        this.toast.success(`User ${user.username} role updated to ${newRole}.`);
        this.loadStats(); // Refresh stats
      },
      error: () => this.toast.error('Failed to update user role.'),
    });
  }
}
