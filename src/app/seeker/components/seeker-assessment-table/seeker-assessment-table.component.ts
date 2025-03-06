import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../shared/services/profile.service';

// Define an interface for the profs data structure
interface Proficiency {
  id: number;
  assessmentDate: string;
  createdAt: string;
  updatedAt: string;
  proficiencyLevel: number;
  skillId: number;
  userId: number;
  skill: {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}

@Component({
  selector: 'app-seeker-assessment-table',
  imports: [CommonModule], // Removed TableModule since we're not using p-table
  standalone: true,
  templateUrl: './seeker-assessment-table.component.html',
  styleUrls: ['./seeker-assessment-table.component.css'],
})
export class SeekerAssessmentTableComponent {
  loading: boolean = false;
  profs: Proficiency[] = [];

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.loadProfs();
  }

  loadProfs() {
    this.loading = true;
    this.profileService.getProf().subscribe({
      next: (prfd: Proficiency[]) => {
        this.profs = prfd;
        this.loading = false;
        console.log('Loaded profs:', prfd);
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.loading = false;
      },
    });
  }
}
