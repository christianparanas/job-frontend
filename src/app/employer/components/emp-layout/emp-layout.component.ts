import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmpHeaderComponent } from '../emp-header/emp-header.component';
import { EmpSidebarComponent } from '../emp-sidebar/emp-sidebar.component';

@Component({
  selector: 'app-emp-layout',
  imports: [RouterModule, EmpHeaderComponent, EmpSidebarComponent],
  standalone: true,
  templateUrl: './emp-layout.component.html',
  styleUrl: './emp-layout.component.css'
})
export class EmpLayoutComponent {

}
