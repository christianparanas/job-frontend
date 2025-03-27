import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../shared/services/admin.service';

interface Skill {
  id: number;
  name: string;
  description: string;
  proficiencyLevel: number;
  assessmentDate: string;
  isExpanded?: boolean; // Add this to track expansion state
}

interface User {
  id: number;
  username: string;
  email: string;
  firstname: string;
  middlename: string;
  lastname: string;
  gender: string;
  image: string;
  website: string;
  address: string;
  about: string;
  status: string;
  takenAssessment: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  skills: Skill[];
}

@Component({
  selector: 'app-assessment-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assessment-detail.component.html',
  styleUrls: ['./assessment-detail.component.css'],
})
export class AssessmentDetailComponent implements OnInit {
  userId: number | null = null;
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.userId = +params['id'] || null;
      if (this.userId) {
        this.fetchUserData(this.userId);
      }
    });
  }

  fetchUserData(userId: number) {
    this.adminService.getUserSkills(userId).subscribe(
      (data: any) => {
        this.user = {
          ...data,
          skills: data.skills.map((skillData: any) => ({
            id: skillData.id,
            name: skillData.skill.name,
            description: skillData.skill.description,
            proficiencyLevel: skillData.proficiencyLevel,
            assessmentDate: skillData.assessmentDate,
            isExpanded: false, // Initialize as collapsed
          })),
        };
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  getProficiencyPercentage(level: number): number {
    return (level / 4) * 100; // Max proficiency is 4
  }

  toggleDescription(skill: Skill) {
    skill.isExpanded = !skill.isExpanded; // Toggle the expanded state
  }
}
