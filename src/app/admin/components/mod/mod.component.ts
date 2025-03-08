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

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.actionItems = [
      {
        label: '',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Components',
            icon: 'pi pi-bolt',
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
          },
        ],
      },
    ];

    // Table Columns
    this.cols = [
      { field: 'username', header: 'Username' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'status', header: 'Status' },
      { field: 'createdAt', header: 'Created' },
      { field: 'action', header: 'Action' },
    ];

    this.getUsers();
  }

  getUsers() {
    this.adminService.getAllUsers().subscribe(
      (data: any) => {
        if (Array.isArray(data.users)) {
          this.users = data.users.map((user: any) => ({
            ...user,
            name: `${user.firstname} ${user.lastname}`,
          }));
        } else {
          console.error('Expected an array but received:', data.users);
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
