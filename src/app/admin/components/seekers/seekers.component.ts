// seekers.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { AdminService } from '../../shared/services/admin.service';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Added for ngModel
import { InputTextModule } from 'primeng/inputtext'; // Added for PrimeNG input

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ConfirmationService, MessageService } from 'primeng/api'; // Added for modals and messages
import { ConfirmDialog } from 'primeng/confirmdialog'; // Added for confirmation dialog
import { ToastModule } from 'primeng/toast'; // Added for toast notifications

interface Column {
  field: string;
  header: string;
}

interface User {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  name?: string;
  isVerified: boolean;
}

@Component({
  selector: 'app-seekers',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ChipModule,
    MenubarModule,
    TieredMenuModule,
    MenuModule,
    ButtonModule,
    RouterModule,
    FormsModule, // Added
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ConfirmDialog, // Added for confirmation dialog
    ToastModule, // Added for toast notifications
  ],
  templateUrl: './seekers.component.html',
  styleUrls: ['./seekers.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class SeekersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = []; // Added for filtered results
  cols: Column[] = [];
  actionItems: MenuItem[] | undefined;
  searchTerm: string = ''; // Added for search functionality

  constructor(
    private adminService: AdminService,
    public router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService // Added for modals
  ) {}

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'status', header: 'Status' },
      { field: 'createdAt', header: 'Created' },
      { field: 'action', header: 'Action' },
    ];

    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsersByRole('User').subscribe(
      (data: any) => {

        this.users = data.map((user: any) => ({
          ...user,
          name: `${user.firstname} ${user.lastname}`,
          actionItems: this.getActionItems(user),
        }));
        this.filteredUsers = [...this.users]; // Initialize filteredUsers
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Added search function
  filterUsers() {
    const searchLower = this.searchTerm.toLowerCase().trim();
    if (!searchLower) {
      this.filteredUsers = [...this.users];
      return;
    }

    this.filteredUsers = this.users.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
    );
  }

  viewUser(user: any) {
    this.router.navigate(['/admin/seeker'], { queryParams: { id: user.id } });
  }

  // Resend Function with Confirmation
  resendVerification(user: User | undefined) {
    if (user) {
      this.confirmationService.confirm({
        message: `Are you sure you want to resend the verification email to ${user.email}?`,
        header: 'Resend Verification',
        icon: 'pi pi-envelope',
        accept: () => {
          this.adminService.resendVerification(user.username).subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `Verification email resent to ${user.email}`,
                life: 3000,
                key: 'br',
              });
            },
            (error) => {
              console.error('Error resending verification:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to resend verification email',
                life: 3000,
                key: 'br',
              });
            }
          );
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Cancelled',

            detail: 'Resend verification cancelled',
            life: 3000,
            key: 'br',
          });
        },
      });
    }
  }

  // Suspend Function with Confirmation
  suspendUser(user: User | undefined) {
    if (user) {
      this.confirmationService.confirm({
        message: `Are you sure you want to suspend ${user.firstname}'s account?`,
        header: 'Suspend User',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.adminService.suspendUser(user.username).subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `${user.firstname}'s account has been suspended`,
                key: 'br',
              });
              this.getUsers(); // Refresh the list
            },
            (error: any) => {
              console.error('Error suspending user:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to suspend user',
                key: 'br',
              });
            }
          );
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Cancelled',
            detail: 'Suspend action cancelled',
            key: 'br',
          });
        },
      });
    }
  }

  // Delete Function with Confirmation
  deleteUser(user: User | undefined) {
    if (user) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete ${user.firstname}'s account? This action cannot be undone.`,
        header: 'Delete User',
        icon: 'pi pi-trash',
        accept: () => {
          this.adminService.deleteUser(user.username).subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `${user.firstname}'s account has been deleted`,
                key: 'br',
              });
              this.getUsers(); // Refresh the list
            },
            (error) => {
              console.error('Error deleting user:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete user',
                key: 'br',
              });
            }
          );
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Cancelled',
            detail: 'Delete action cancelled',
            key: 'br',
          });
        },
      });
    }
  }

  unsuspendUser(user: User | undefined) {
    if (user) {
      this.confirmationService.confirm({
        message: `Are you sure you want to unsuspend ${user.firstname}'s account?`,
        header: 'Unsuspend User',
        icon: 'pi pi-check-circle',
        accept: () => {
          this.adminService.unsuspendUser(user.username).subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `${user.firstname}'s account has been unsuspended`,
                key: 'br',
              });
              this.getUsers();
            },
            (error: any) => {
              console.error('Error unsuspending user:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to unsuspend user',
                key: 'br',
              });
            }
          );
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Cancelled',
            detail: 'Unsuspend action cancelled',
            key: 'br',
          });
        },
      });
    }
  }

  activateUser(user: User | undefined) {
    if (user) {
      this.confirmationService.confirm({
        message: `Are you sure you want to activate ${user.firstname}'s account?`,
        header: 'Activate User',
        icon: 'pi pi-check-circle',
        accept: () => {
          this.adminService.activateUser(user.username).subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `${user.firstname}'s account has been activated`,
                key: 'br',
              });
              this.getUsers();
            },
            (error: any) => {
              console.error('Error activating user:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to activate user',
                key: 'br',
              });
            }
          );
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Cancelled',
            detail: 'Activate action cancelled',
            key: 'br',
          });
        },
      });
    }
  }

  getActionItems(user: User): MenuItem[] {
    // Base menu items
    const items: MenuItem[] = [
      {
        label: 'View',
        icon: 'fal fa-eye',
        command: () => this.viewUser(user),
      },
      {
        label: 'Delete',
        icon: 'fal fa-trash-alt',
        command: () => this.deleteUser(user),
      },
    ];

    // Conditionally add Resend Verification if the user is not verified
    if (!user.isVerified) {
      items.push({
        label: 'Resend Verification',
        icon: 'fal fa-envelope',
        command: () => this.resendVerification(user),
      });
    }

    // Conditionally add status-related actions
    if (user.status === 'active') {
      items.push({
        label: 'Suspend',
        icon: 'fal fa-pause-circle',
        command: () => this.suspendUser(user),
      });
    } else if (user.status === 'suspended') {
      items.push({
        label: 'Unsuspend',
        icon: 'fal fa-play-circle',
        command: () => this.unsuspendUser(user),
      });
    } else if (user.status === 'inactive') {
      items.push({
        label: 'Activate',
        icon: 'fal fa-check-circle',
        command: () => this.activateUser(user),
      });
    }

    return [
      {
        label: '',
        icon: 'fal fa-cog',
        items,
      },
    ];
  }

  trackByField(index: number, col: Column): string {
    return col.field;
  }
}
