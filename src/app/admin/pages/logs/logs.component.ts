import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { LogService } from '../../shared/services/logs.service';
import { DatePipe } from '@angular/common';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-logs',
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
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
})
export class LogsComponent implements OnInit {
  logs: any[] = [];
  cols: Column[] = [];
  actionItems: MenuItem[] | undefined;

  constructor(private logService: LogService, private datePipe: DatePipe) {}

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
      { field: 'user', header: 'User' },
      { field: 'id', header: 'Entity ID' },
      { field: 'action', header: 'Action' },
      { field: 'description', header: 'Description' },
      { field: 'type', header: 'Type' },
      { field: 'role', header: 'Role' },
      { field: 'timestamp', header: 'Timestamp' },
    ];

    this.getLogs();
  }

  getLogs() {
    this.logService.getUsers().subscribe(
      (data: any) => {
        console.log(data)

        this.logs = data.logs.map((log: any) => ({
          ...log,
          timestamp: `${this.datePipe.transform(log.createdAt, 'dd MMM yyyy')}
                           ${this.datePipe.transform(log.createdAt, 'HH:mm')}`, // Combine date and time
          user: `${log.user.firstname} ${
            log.user.lastname == null ? '' : log.user.lastname
          }`,
          role: log.user.Roles.map((role: any) => role.name),
        }));
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
