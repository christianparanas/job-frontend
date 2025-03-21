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
import { Router } from '@angular/router';

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
  name?: string; // Adding 'name' as an optional field for concatenation
}

@Component({
  selector: 'app-mod',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ChipModule,
    MenubarModule,
    TieredMenuModule,
    MenuModule,
    ButtonModule,
  ],
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.css'],
})
export class ModComponent implements OnInit {
  users: User[] = [];
  cols: Column[] = [];
  actionItems: MenuItem[] | undefined;

  constructor(private adminService: AdminService, public router: Router) {}

  ngOnInit() {
    // Table Columns
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
    this.adminService.getUsersByRole('Employer').subscribe(
      (data: any) => {
        this.users = data.map((user: any) => ({
          ...user,
          name: `${user.firstname}`,
          actionItems: this.getActionItems(user),
        }));

      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  viewUser(user: any) {
    this.router.navigate(['/admin/employer'], { queryParams: { id: user.id } });
  }

  suspendUser(user: User | undefined) {
    if (user) {
      // this.adminService.suspendUser(user.username).subscribe(
      //   () => {
      //     console.log('User suspended:', user.username);
      //     this.getUsers(); // Refresh the list
      //   },
      //   (error) => {
      //     console.error('Error suspending user:', error);
      //   }
      // );
    }
  }

  deleteUser(user: User | undefined) {
    if (user) {
      if (confirm(`Are you sure you want to delete ${user.firstname} account?`)) {
        this.adminService.deleteUser(user.username).subscribe(
          () => {
            console.log('User account deleted:', user.firstname);
            this.getUsers(); // Refresh the list
          },
          (error) => {
            console.error('Error deleting user:', error);
          }
        );
      }
    }
  }

  // Helper to pass user data to menu items
  getActionItems(user: User): MenuItem[] {
    return [
      {
        label: '',
        icon: 'fal fa-cog',
        items: [
          {
            label: 'View',
            icon: 'fal fa-eye',
            command: () => this.viewUser(user),
          },
          // {
          //   label: 'Suspend',
          //   icon: 'fal fa-pause-circle',
          //   command: () => this.suspendUser(user),
          // },
          {
            label: 'Delete',
            icon: 'fal fa-trash-alt',
            command: () => this.deleteUser(user),
          },
        ],
      },
    ];
  }

  trackByField(index: number, col: Column): string {
    return col.field; // Unique identifier for tracking
  }
}
