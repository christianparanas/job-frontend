import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { TicketService } from '../../shared/services/ticket.service';
import { ChipModule } from 'primeng/chip';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ChipModule],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  tickets: any[] = [];
  cols: Column[] = [];
  actionItems: MenuItem[] | undefined;

  constructor(
    private ticketService: TicketService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    // Define actions for the menu (optional)
    this.actionItems = [
      {
        label: 'Manage',
        icon: 'pi pi-cog',
        items: [
          { label: 'Edit', icon: 'pi pi-pencil' },
          { label: 'Delete', icon: 'pi pi-trash' },
        ],
      },
    ];

    // Table Columns
    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'description', header: 'Description' },
      { field: 'status', header: 'Status' },
      { field: 'priority', header: 'Priority' },
      { field: 'assignedTo', header: 'Assigned To' },
      { field: 'dueDate', header: 'Due Date' },
      { field: 'timestamp', header: 'Timestamp' },
    ];

    // Load tickets data
    this.getTickets();
  }

  getTickets() {
    this.ticketService.getTickets().subscribe(
      (data: any) => {
        console.log(data);
        this.tickets = data.map((ticket: any) => ({
          ...ticket,
          timestamp: `${this.datePipe.transform(
            ticket.createdAt,
            'dd MMM yyyy'
          )}
                       ${this.datePipe.transform(ticket.createdAt, 'HH:mm')}`, // Format date and time
          assignedTo: `${ticket.assignedTo.firstname} ${ticket.assignedTo.lastname}`,
        }));
      },
      (error: any) => {
        console.error('Error fetching tickets:', error);
      }
    );
  }

  // Function to delete a ticket
  deleteTicket(id: number): void {
    this.ticketService.deleteTicket(id).subscribe(
      () => {
        this.tickets = this.tickets.filter((ticket) => ticket.id !== id); // Remove deleted ticket from the list
      },
      (error) => {
        console.error('Error deleting ticket:', error);
      }
    );
  }
}
