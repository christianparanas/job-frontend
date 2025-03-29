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
  AssessmentDate: Date;
  name?: string; // Adding 'name' as an optional field for concatenation
}

@Component({
  selector: 'app-assessments',
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
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css'],
})
export class AssessmentsComponent implements OnInit {
  users: User[] = [];
  cols: Column[] = [];
  actionItems: MenuItem[] | undefined;

  constructor(private adminService: AdminService, public router: Router) {}

  ngOnInit() {
    // Table Columns
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'AssessmentDate', header: 'Date' },
      { field: 'action', header: 'Action' },
    ];

    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsersWithAssessments().subscribe(
      (data: any) => {

        this.users = data.map((user: any) => ({
          ...user,
          name: `${user.firstname}`,
          AssessmentDate: user.skills[0].createdAt,
          actionItems: this.getActionItems(user),
        }));
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  viewUser(user: any) {
    this.router.navigate(['/admin/assessment'], {
      queryParams: { id: user.id },
    });
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
        ],
      },
    ];
  }

  trackByField(index: number, col: Column): string {
    return col.field; // Unique identifier for tracking
  }
}
