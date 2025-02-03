import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { SeekersComponent } from '../../components/seekers/seekers.component';
import { ModComponent } from '../../components/mod/mod.component';

@Component({
  selector: 'app-users',
  imports: [CommonModule, TabsModule, SeekersComponent, ModComponent],
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  tabs: { title: string; value: number; content: string }[] = [];
  // Variable for storing the currently selected tab index
  selectedTabIndex: number = 0;  // Default selected tab index (tab 0)

  ngOnInit() {
    this.tabs = [
      { title: 'Users', value: 0, content: 'Tab 1 Content' },
      { title: 'Admin/Moderators', value: 1, content: 'Tab 2 Content' },
    ];
  }

  // Track function to improve performance when iterating over tabs
  trackTabValue(index: number, tab: any): number {
    return tab.value; // track by tab value
  }

  constructor() { }
}
