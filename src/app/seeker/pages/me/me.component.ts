import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { SeekerAssessmentTableComponent } from '../../components/seeker-assessment-table/seeker-assessment-table.component';
import { SeekerInformationComponent } from '../../components/seeker-information/seeker-information.component';
import {
  ProfileService,
  UserProfile,
} from '../../shared/services/profile.service';

@Component({
  selector: 'app-me',
  imports: [
    TabsModule,
    CommonModule,
    SeekerAssessmentTableComponent,
    SeekerInformationComponent,
  ],
  standalone: true,
  templateUrl: './me.component.html',
  styleUrl: './me.component.css',
})
export class MeComponent implements OnInit {
  tabs: { title: string; value: number; content: string }[] = [];
  selectedTabIndex: number = 0;
  profile: any;
  loading: boolean = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.initializeTabs();
    this.loadProfile();
  }

  initializeTabs() {
    this.tabs = [
      { title: 'Personal Information', value: 0, content: 'Tab 1 Content' },
      { title: 'Skill Proficiencies', value: 1, content: 'Tab 2 Content' },
      // { title: 'Recommended For You', value: 3, content: 'Tab 3 Content' },
    ];
  }

  loadProfile() {
    this.loading = true;
    this.profileService.getProfile().subscribe({
      next: (profileData) => {
        this.profile = profileData;
        console.log(profileData);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.loading = false;
      },
    });
  }

  onTabChange(event: any) {
    this.selectedTabIndex = event.index;
  }

  trackTabValue(index: number, tab: any): number {
    return tab.value;
  }
}
