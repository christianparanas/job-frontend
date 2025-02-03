import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterModule, AdminHeaderComponent, AdminSidebarComponent],
  standalone: true,
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
