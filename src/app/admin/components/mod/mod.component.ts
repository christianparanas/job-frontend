import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';

interface Column {
  field: string;
  header: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}
@Component({
  selector: 'app-mod',
  imports: [TableModule, CommonModule, ChipModule],
  standalone: true,
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.css'],
})
export class ModComponent implements OnInit {
  users: User[] = [];
  cols: Column[] = [];

  constructor() {}

  ngOnInit() {
    // Sample User Data
    this.users = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
        status: 'Active',
        createdAt: '2024-02-06',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'User',
        status: 'Inactive',
        createdAt: '2024-01-20',
      },
      {
        id: '3',
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        role: 'Moderator',
        status: 'Active',
        createdAt: '2023-12-15',
      },
      {
        id: '4',
        name: 'Emily Johnson',
        email: 'emily.johnson@example.com',
        role: 'User',
        status: 'Pending',
        createdAt: '2024-02-01',
      },
      {
        id: '5',
        name: 'David Wilson',
        email: 'david.wilson@example.com',
        role: 'Admin',
        status: 'Active',
        createdAt: '2023-11-10',
      },
    ];

    // Table Columns
    this.cols = [
      { field: 'username', header: 'Username' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'role', header: 'Role' },
      { field: 'status', header: 'Status' },
      { field: 'createdAt', header: 'Created At' },
    ];
  }
}
