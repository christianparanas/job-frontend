import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { SeekerAssessmentTableComponent } from '../../components/seeker-assessment-table/seeker-assessment-table.component';
import { SeekerInformationComponent } from '../../components/seeker-information/seeker-information.component';
import { SeekerLevelComponent } from '../../components/seeker-level/seeker-level.component';
import { SeekerRecommendationComponent } from '../../components/seeker-recommendation/seeker-recommendation.component';

@Component({
  selector: 'app-me',
  imports: [
    TabsModule,
    CommonModule,
    SeekerAssessmentTableComponent,
    SeekerInformationComponent,
    SeekerLevelComponent,
    SeekerRecommendationComponent,
  ],
  standalone: true,
  templateUrl: './me.component.html',
  styleUrl: './me.component.css',
})
export class MeComponent implements OnInit {
  tabs: { title: string; value: number; content: string }[] = [];
  // Variable for storing the currently selected tab index
  selectedTabIndex: number = 0;  // Default selected tab index (tab 0)

  ngOnInit() {
    this.tabs = [
      { title: 'Personal Information', value: 0, content: 'Tab 1 Content' },
      { title: 'Assessment History', value: 1, content: 'Tab 2 Content' },
      { title: 'Current Level/Ability', value: 2, content: 'Tab 3 Content' },
      { title: 'Recommended For You', value: 3, content: 'Tab 3 Content' },
    ];
  }

  // Track function to improve performance when iterating over tabs
  trackTabValue(index: number, tab: any): number {
    return tab.value; // track by tab value
  }

  constructor() { }
}
