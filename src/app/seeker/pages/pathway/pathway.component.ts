// pathway.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HotToastService } from '@ngxpert/hot-toast';
import { AuthService } from '../../../core/shared/services/auth.service';
import { ProfileService } from '../../shared/services/profile.service';

interface SkillRequirement {
  skill: string;
  requiredLevel: number;
  userLevel: number;
  meetsRequirement: boolean;
}

interface MissingSkill {
  skill: string;
  requiredLevel: number;
  userLevel: number;
}

interface RolePathway {
  role: string;
  level: string;
  isEligible: boolean;
  requirements: SkillRequirement[];
  missingSkills: MissingSkill[];
}

interface Pathway {
  associateDataAnalyst: RolePathway;
  dataAnalyst: RolePathway;
  associateDataEngineer: RolePathway;
  businessIntelligenceAnalyst: RolePathway;
  dataEngineer: RolePathway;
  machineLearningEngineer: RolePathway;
  appliedDataAIResearcher: RolePathway;
}

interface NodePosition {
  x: number;
  y: number;
  roleKey: keyof Pathway;
}

@Component({
  selector: 'app-pathway',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pathway.component.html',
  styleUrls: ['./pathway.component.css'],
})
export class PathwayComponent implements OnInit {
  pathway: Pathway = {
    associateDataAnalyst: {
      role: 'Associate Data Analyst',
      level: 'Associate',
      isEligible: false,
      requirements: [],
      missingSkills: [],
    },
    dataAnalyst: {
      role: 'Data Analyst',
      level: 'Senior Associate',
      isEligible: false,
      requirements: [],
      missingSkills: [],
    },
    associateDataEngineer: {
      role: 'Associate Data Engineer',
      level: 'Senior Associate',
      isEligible: false,
      requirements: [],
      missingSkills: [],
    },
    businessIntelligenceAnalyst: {
      role: 'Business Intelligence Analyst',
      level: 'Professional',
      isEligible: false,
      requirements: [],
      missingSkills: [],
    },
    dataEngineer: {
      role: 'Data Engineer',
      level: 'Professional',
      isEligible: false,
      requirements: [],
      missingSkills: [],
    },
    machineLearningEngineer: {
      role: 'Machine Learning Engineer',
      level: 'Professional',
      isEligible: false,
      requirements: [],
      missingSkills: [],
    },
    appliedDataAIResearcher: {
      role: 'Applied Data/AI Researcher',
      level: 'Professional',
      isEligible: false,
      requirements: [],
      missingSkills: [],
    },
  };

  error: string | null = null;
  isPathwayLoaded: boolean = false;
  selectedRole: RolePathway | null = null;

  // Define node positions for the SVG layout
  nodePositions: NodePosition[] = [
    { x: 300, y: 50, roleKey: 'associateDataAnalyst' }, // Associate Level
    { x: 200, y: 200, roleKey: 'dataAnalyst' }, // Senior Associate Level (left)
    { x: 400, y: 200, roleKey: 'associateDataEngineer' }, // Senior Associate Level (right)
    { x: 100, y: 350, roleKey: 'businessIntelligenceAnalyst' }, // Professional Level (left)
    { x: 300, y: 350, roleKey: 'dataEngineer' }, // Professional Level (middle-left)
    { x: 500, y: 350, roleKey: 'machineLearningEngineer' }, // Professional Level (middle-right)
    { x: 500, y: 500, roleKey: 'appliedDataAIResearcher' }, // Professional Level (bottom-right)
  ];

  // Define connections between roles (for drawing arrows)
  connections: { from: keyof Pathway; to: keyof Pathway }[] = [
    { from: 'associateDataAnalyst', to: 'dataAnalyst' },
    { from: 'associateDataAnalyst', to: 'associateDataEngineer' },
    { from: 'dataAnalyst', to: 'businessIntelligenceAnalyst' },
    { from: 'associateDataEngineer', to: 'dataEngineer' },
    { from: 'dataEngineer', to: 'machineLearningEngineer' },
    { from: 'machineLearningEngineer', to: 'appliedDataAIResearcher' },
  ];

  constructor(
    private http: HttpClient,
    private toast: HotToastService,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.loadCareerPathway();
  }

  loadCareerPathway(): void {
    const userId = this.authService.getUser()?.id;
    if (!userId) {
      this.toast.error('User ID not found.');
      this.error = 'User ID not found.';
      return;
    }

    this.profileService.getPathway().subscribe({
      next: (pathwayData) => {
        const pathway: Pathway = {
          associateDataAnalyst: {
            role: 'Associate Data Analyst',
            level: 'Associate',
            isEligible: false,
            requirements: [],
            missingSkills: [],
          },
          dataAnalyst: {
            role: 'Data Analyst',
            level: 'Senior Associate',
            isEligible: false,
            requirements: [],
            missingSkills: [],
          },
          associateDataEngineer: {
            role: 'Associate Data Engineer',
            level: 'Senior Associate',
            isEligible: false,
            requirements: [],
            missingSkills: [],
          },
          businessIntelligenceAnalyst: {
            role: 'Business Intelligence Analyst',
            level: 'Professional',
            isEligible: false,
            requirements: [],
            missingSkills: [],
          },
          dataEngineer: {
            role: 'Data Engineer',
            level: 'Professional',
            isEligible: false,
            requirements: [],
            missingSkills: [],
          },
          machineLearningEngineer: {
            role: 'Machine Learning Engineer',
            level: 'Professional',
            isEligible: false,
            requirements: [],
            missingSkills: [],
          },
          appliedDataAIResearcher: {
            role: 'Applied Data/AI Researcher',
            level: 'Professional',
            isEligible: false,
            requirements: [],
            missingSkills: [],
          },
        };

        pathwayData.forEach((role: RolePathway) => {
          const key = role.role
            .replace(/\s+/g, '')
            .toLowerCase() as keyof Pathway;
          pathway[key] = role;
        });

        this.pathway = pathway;
        this.isPathwayLoaded = true;
        console.log('Loaded pathway:', this.pathway);
      },
      error: (err) => {
        console.error('Error loading career pathway:', err);
        this.toast.error('Failed to load career pathway.');
        this.error = 'Failed to load career pathway.';
      },
    });
  }

  // Select a role to display its details
  selectRole(roleKey: keyof Pathway): void {
    this.selectedRole = this.pathway[roleKey];
  }

  // Get node position by role key
  getNodePosition(roleKey: keyof Pathway): NodePosition | undefined {
    return this.nodePositions.find((pos) => pos.roleKey === roleKey);
  }
}
