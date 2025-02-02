import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-seeker-level',
  imports: [ChartModule],
  standalone: true,
  templateUrl: './seeker-level.component.html',
  styleUrl: './seeker-level.component.css'
})
export class SeekerLevelComponent implements OnInit {
  abilityProgressData: any;
  abilityProgressOptions: any;

  subjectProgressData: any;
  subjectProgressOptions: any;

  difficultyLevelData: any;
  difficultyLevelOptions: any;

  timeTakenData: any;
  timeTakenOptions: any;

  completionRateData: any;
  completionRateOptions: any;

  strengthsWeaknessesData: any;
  strengthsWeaknessesOptions: any;

  conceptMasteryData: any;
  conceptMasteryOptions: any;

  assessmentTrendsData: any;
  assessmentTrendsOptions: any;

  goalProgress: number = 75; // Example progress bar percentage

  achievementBadges: any[] = [
    { name: 'Top Performer', icon: 'assets/top_performer_icon.png' },
    { name: 'Goal Achiever', icon: 'assets/goal_achiever_icon.png' }
  ];

  ngOnInit() {
    // Ability Progress Data
    this.abilityProgressData = {
      labels: ['Assessment 1', 'Assessment 2', 'Assessment 3'],
      datasets: [{
        label: 'Ability Progress',
        data: [50, 60, 80],
        borderColor: '#42A5F5',
        fill: false
      }]
    };
    this.abilityProgressOptions = { scales: { y: { min: 0, max: 100 } } };

    // Subject Progress Data (Radar Chart)
    this.subjectProgressData = {
      labels: ['Math', 'Reading', 'Problem-Solving'],
      datasets: [{
        label: 'Subject Progress',
        data: [80, 70, 90],
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        borderColor: '#42A5F5'
      }]
    };
    this.subjectProgressOptions = { scale: { ticks: { min: 0, max: 100 } } };

    // Difficulty Level Data (Line Chart)
    this.difficultyLevelData = {
      labels: ['Assessment 1', 'Assessment 2', 'Assessment 3'],
      datasets: [{
        label: 'Difficulty Level',
        data: [1, 2, 3],
        borderColor: '#FF9800',
        fill: false
      }]
    };
    this.difficultyLevelOptions = { scales: { y: { min: 0, max: 5 } } };

    // Time Taken Per Assessment Data (Bar Chart)
    this.timeTakenData = {
      labels: ['Assessment 1', 'Assessment 2', 'Assessment 3'],
      datasets: [{
        label: 'Time Taken (mins)',
        data: [15, 12, 10],
        backgroundColor: '#66BB6A'
      }]
    };
    this.timeTakenOptions = {};

    // Other categories can follow similar patterns...
  }
}
