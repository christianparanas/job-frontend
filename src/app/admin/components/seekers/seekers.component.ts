import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../shared/services/user.service';

interface Column {
  field: string;
  header: string;
}

interface User {
  username: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

@Component({
  selector: 'app-seekers',
  imports: [
    TableModule,
    CommonModule,
    ChipModule,
    MenubarModule,
    MenuModule,
    ButtonModule,
  ],
  standalone: true,
  templateUrl: './seekers.component.html',
  styleUrls: ['./seekers.component.css'],
})
export class SeekersComponent implements OnInit {
  users: any[] = [];
  cols: Column[] = [];
  actionItems: MenuItem[] | undefined;

  constructor(private userService: UserService) {}

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
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
