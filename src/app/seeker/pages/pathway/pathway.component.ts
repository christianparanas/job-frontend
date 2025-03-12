// pathway.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HotToastService } from '@ngxpert/hot-toast';
import { AuthService } from '../../../core/shared/services/auth.service';
import { ProfileService } from '../../shared/services/profile.service';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TooltipModule } from 'primeng/tooltip';
import { TreeNode } from 'primeng/api';

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

interface LearningResource {
  title: string;
  url: string;
}

interface RolePathway {
  role: string;
  level: string;
  isEligible: boolean;
  requirements: SkillRequirement[];
  missingSkills: MissingSkill[];
  description?: string;
  recommendedResources?: LearningResource[];
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

interface Recommendation {
  skill: string;
  action: string;
  resource?: string;
}

@Component({
  selector: 'app-pathway',
  standalone: true,
  imports: [CommonModule, OrganizationChartModule, TooltipModule],
  templateUrl: './pathway.component.html',
  styleUrls: ['./pathway.component.css'],
})
export class PathwayComponent implements OnInit {
  pathway: Pathway = {
    associateDataAnalyst: {
      role: 'Associate Data Analyst',
      level: 'Associate',
      isEligible: false,
      requirements: [
        { skill: 'Applications Development', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Artificial Intelligence Ethics and Governance', requiredLevel: 2, userLevel: 4, meetsRequirement: true },
        { skill: 'Business Needs Analysis', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Configuration Tracking', requiredLevel: 1, userLevel: 3, meetsRequirement: true },
        { skill: 'Cyber and Data Breach Incident Management', requiredLevel: 2, userLevel: 1, meetsRequirement: false },
        { skill: 'Data Analytics', requiredLevel: 2, userLevel: 3, meetsRequirement: true },
        { skill: 'Data Engineering', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Data Ethics', requiredLevel: 2, userLevel: 1, meetsRequirement: false },
        { skill: 'Data Visualisation', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Software Testing', requiredLevel: 2, userLevel: 3, meetsRequirement: true },
        { skill: 'Stakeholder Management', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
      ],
      missingSkills: [],
      description: 'Entry-level role focused on analyzing and visualizing data ethically, supporting business needs analysis and software testing.',
      recommendedResources: [
        { title: 'Applications Development Guide', url: 'https://example.com/app-dev' },
        { title: 'AI Ethics Course', url: 'https://example.com/ai-ethics' },
        { title: 'Business Needs Analysis Guide', url: 'https://example.com/business-needs' },
        { title: 'Configuration Tracking Basics', url: 'https://example.com/config-tracking' },
        { title: 'Cyber Security Fundamentals', url: 'https://example.com/cyber-security' },
        { title: 'Data Analytics Basics', url: 'https://example.com/data-analytics' },
        { title: 'Data Engineering Fundamentals', url: 'https://example.com/data-engineering' },
        { title: 'Data Ethics Course', url: 'https://example.com/data-ethics' },
        { title: 'Data Visualisation with Tableau', url: 'https://example.com/tableau' },
        { title: 'Software Testing Tutorial', url: 'https://example.com/software-testing' },
        { title: 'Stakeholder Management Guide', url: 'https://example.com/stakeholder-management' },
      ],
    },
    dataAnalyst: {
      role: 'Data Analyst',
      level: 'Senior Associate',
      isEligible: false,
      requirements: [
        { skill: 'Applications Development', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Applications Integration', requiredLevel: 3, userLevel: 3, meetsRequirement: true },
        { skill: 'Artificial Intelligence Ethics and Governance', requiredLevel: 2, userLevel: 4, meetsRequirement: true },
        { skill: 'Business Needs Analysis', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Configuration Tracking', requiredLevel: 2, userLevel: 3, meetsRequirement: true },
        { skill: 'Cyber and Data Breach Incident Management', requiredLevel: 2, userLevel: 1, meetsRequirement: false },
        { skill: 'Data Analytics', requiredLevel: 3, userLevel: 3, meetsRequirement: true },
        { skill: 'Data Engineering', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Data Ethics', requiredLevel: 3, userLevel: 1, meetsRequirement: false },
        { skill: 'Data Visualisation', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Design Thinking Practice', requiredLevel: 3, userLevel: 1, meetsRequirement: false },
        { skill: 'Software Testing', requiredLevel: 2, userLevel: 3, meetsRequirement: true },
        { skill: 'Stakeholder Management', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
      ],
      missingSkills: [],
      description: 'Analyze complex datasets with advanced visualization, ethical considerations, and stakeholder collaboration.',
      recommendedResources: [
        { title: 'Applications Development Guide', url: 'https://example.com/app-dev' },
        { title: 'Applications Integration Tutorial', url: 'https://example.com/app-integration' },
        { title: 'AI Ethics Course', url: 'https://example.com/ai-ethics' },
        { title: 'Business Needs Analysis Guide', url: 'https://example.com/business-needs' },
        { title: 'Configuration Tracking Basics', url: 'https://example.com/config-tracking' },
        { title: 'Cyber Security Fundamentals', url: 'https://example.com/cyber-security' },
        { title: 'Data Analytics Basics', url: 'https://example.com/data-analytics' },
        { title: 'Data Engineering Fundamentals', url: 'https://example.com/data-engineering' },
        { title: 'Data Ethics Advanced', url: 'https://example.com/data-ethics-advanced' },
        { title: 'Data Visualisation Mastery', url: 'https://example.com/visualisation-mastery' },
        { title: 'Design Thinking Course', url: 'https://example.com/design-thinking' },
        { title: 'Software Testing Tutorial', url: 'https://example.com/software-testing' },
        { title: 'Stakeholder Management Guide', url: 'https://example.com/stakeholder-management' },
      ],
    },
    associateDataEngineer: {
      role: 'Associate Data Engineer',
      level: 'Senior Associate',
      isEligible: false,
      requirements: [
        { skill: 'Applications Development', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Applications Integration', requiredLevel: 2, userLevel: 3, meetsRequirement: true },
        { skill: 'Artificial Intelligence Ethics and Governance', requiredLevel: 2, userLevel: 4, meetsRequirement: true },
        { skill: 'Business Needs Analysis', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Cloud Computing', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Configuration Tracking', requiredLevel: 2, userLevel: 3, meetsRequirement: true },
        { skill: 'Continuous Integration and Continuous Deployment', requiredLevel: 2, userLevel: 1, meetsRequirement: false },
        { skill: 'Cyber and Data Breach Incident Management', requiredLevel: 2, userLevel: 1, meetsRequirement: false },
        { skill: 'Data Design', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Data Engineering', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Data Ethics', requiredLevel: 2, userLevel: 1, meetsRequirement: false },
        { skill: 'Data Migration', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Data Visualisation', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Database Administration', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Design Thinking Practice', requiredLevel: 2, userLevel: 1, meetsRequirement: false },
        { skill: 'Software Configuration', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Software Testing', requiredLevel: 2, userLevel: 3, meetsRequirement: true },
        { skill: 'Stakeholder Management', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'System Integration', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
      ],
      missingSkills: [],
      description: 'Build data pipelines using cloud technologies and visualization tools.',
      recommendedResources: [
        { title: 'Applications Development Guide', url: 'https://example.com/app-dev' },
        { title: 'Applications Integration Tutorial', url: 'https://example.com/app-integration' },
        { title: 'AI Ethics Course', url: 'https://example.com/ai-ethics' },
        { title: 'Business Needs Analysis Guide', url: 'https://example.com/business-needs' },
        { title: 'Cloud Computing Basics', url: 'https://example.com/cloud-computing' },
        { title: 'Configuration Tracking Basics', url: 'https://example.com/config-tracking' },
        { title: 'CI/CD Fundamentals', url: 'https://example.com/ci-cd' },
        { title: 'Cyber Security Fundamentals', url: 'https://example.com/cyber-security' },
        { title: 'Data Design Principles', url: 'https://example.com/data-design' },
        { title: 'Data Engineering Fundamentals', url: 'https://example.com/data-engineering' },
        { title: 'Data Ethics Course', url: 'https://example.com/data-ethics' },
        { title: 'Data Migration Strategies', url: 'https://example.com/data-migration' },
        { title: 'Data Visualisation Intro', url: 'https://example.com/data-visualisation' },
        { title: 'Database Administration Basics', url: 'https://example.com/db-admin' },
        { title: 'Design Thinking Course', url: 'https://example.com/design-thinking' },
        { title: 'Software Configuration Guide', url: 'https://example.com/software-config' },
        { title: 'Software Testing Tutorial', url: 'https://example.com/software-testing' },
        { title: 'Stakeholder Management Guide', url: 'https://example.com/stakeholder-management' },
        { title: 'System Integration Basics', url: 'https://example.com/system-integration' },
      ],
    },
    businessIntelligenceAnalyst: {
      role: 'Business Intelligence Analyst',
      level: 'Professional',
      isEligible: false,
      requirements: [
        { skill: 'Artificial Intelligence Ethics and Governance', requiredLevel: 3, userLevel: 4, meetsRequirement: true },
        { skill: 'Business Environment Analysis', requiredLevel: 2, userLevel: 1, meetsRequirement: false },
        { skill: 'Business Needs Analysis', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Data Ethics', requiredLevel: 3, userLevel: 1, meetsRequirement: false },
        { skill: 'Data Visualisation', requiredLevel: 4, userLevel: 2, meetsRequirement: false },
        { skill: 'Design Thinking Practice', requiredLevel: 3, userLevel: 1, meetsRequirement: false },
        { skill: 'Software Testing', requiredLevel: 3, userLevel: 3, meetsRequirement: true },
        { skill: 'Stakeholder Management', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Test Planning', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
      ],
      missingSkills: [],
      description: 'Create actionable business insights using advanced visualization tools.',
      recommendedResources: [
        { title: 'AI Ethics Course', url: 'https://example.com/ai-ethics' },
        { title: 'Business Environment Analysis Guide', url: 'https://example.com/business-environment' },
        { title: 'Business Needs Analysis Guide', url: 'https://example.com/business-needs' },
        { title: 'Data Ethics for Professionals', url: 'https://example.com/data-ethics-pro' },
        { title: 'Power BI for BI Analysts', url: 'https://example.com/power-bi' },
        { title: 'Design Thinking Course', url: 'https://example.com/design-thinking' },
        { title: 'Software Testing Tutorial', url: 'https://example.com/software-testing' },
        { title: 'Stakeholder Management Guide', url: 'https://example.com/stakeholder-management' },
        { title: 'Test Planning Basics', url: 'https://example.com/test-planning' },
      ],
    },
    dataEngineer: {
      role: 'Data Engineer',
      level: 'Professional',
      isEligible: false,
      requirements: [
        { skill: 'Agile Software Development', requiredLevel: 3, userLevel: 1, meetsRequirement: false },
        { skill: 'Applications Development', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Applications Integration', requiredLevel: 3, userLevel: 3, meetsRequirement: true },
        { skill: 'Artificial Intelligence Ethics and Governance', requiredLevel: 3, userLevel: 4, meetsRequirement: true },
        { skill: 'Business Needs Analysis', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Change Management', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Cloud Computing', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Configuration Tracking', requiredLevel: 2, userLevel: 3, meetsRequirement: true },
        { skill: 'Continuous Integration and Continuous Deployment', requiredLevel: 2, userLevel: 1, meetsRequirement: false },
        { skill: 'Cyber and Data Breach Incident Management', requiredLevel: 2, userLevel: 1, meetsRequirement: false },
        { skill: 'Data Design', requiredLevel: 4, userLevel: 2, meetsRequirement: false },
        { skill: 'Data Engineering', requiredLevel: 4, userLevel: 2, meetsRequirement: false },
        { skill: 'Data Ethics', requiredLevel: 3, userLevel: 1, meetsRequirement: false },
        { skill: 'Data Migration', requiredLevel: 4, userLevel: 2, meetsRequirement: false },
        { skill: 'Data Visualisation', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Database Administration', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Design Thinking Practice', requiredLevel: 2, userLevel: 1, meetsRequirement: false },
        { skill: 'Security Administration', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Software Configuration', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Software Testing', requiredLevel: 2, userLevel: 3, meetsRequirement: true },
        { skill: 'Stakeholder Management', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'System Integration', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Test Planning', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
      ],
      missingSkills: [],
      description: 'Design scalable data systems using advanced engineering and cloud tools.',
      recommendedResources: [
        { title: 'Agile Software Development Guide', url: 'https://example.com/agile' },
        { title: 'Applications Development Guide', url: 'https://example.com/app-dev' },
        { title: 'Applications Integration Tutorial', url: 'https://example.com/app-integration' },
        { title: 'AI Ethics Course', url: 'https://example.com/ai-ethics' },
        { title: 'Business Needs Analysis Guide', url: 'https://example.com/business-needs' },
        { title: 'Change Management Basics', url: 'https://example.com/change-management' },
        { title: 'AWS Cloud Computing', url: 'https://example.com/aws-cloud' },
        { title: 'Configuration Tracking Basics', url: 'https://example.com/config-tracking' },
        { title: 'CI/CD Fundamentals', url: 'https://example.com/ci-cd' },
        { title: 'Cyber Security Fundamentals', url: 'https://example.com/cyber-security' },
        { title: 'Data Design Principles', url: 'https://example.com/data-design' },
        { title: 'Advanced Data Engineering', url: 'https://example.com/advanced-data-engineering' },
        { title: 'Data Ethics Advanced', url: 'https://example.com/data-ethics-advanced' },
        { title: 'Data Migration Strategies', url: 'https://example.com/data-migration' },
        { title: 'Data Visualisation Tools', url: 'https://example.com/visualisation-tools' },
        { title: 'Database Administration Basics', url: 'https://example.com/db-admin' },
        { title: 'Design Thinking Course', url: 'https://example.com/design-thinking' },
        { title: 'Security Administration Guide', url: 'https://example.com/security-admin' },
        { title: 'Software Configuration Guide', url: 'https://example.com/software-config' },
        { title: 'Software Testing Tutorial', url: 'https://example.com/software-testing' },
        { title: 'Stakeholder Management Guide', url: 'https://example.com/stakeholder-management' },
        { title: 'System Integration Basics', url: 'https://example.com/system-integration' },
        { title: 'Test Planning Basics', url: 'https://example.com/test-planning' },
      ],
    },
    machineLearningEngineer: {
      role: 'Machine Learning Engineer',
      level: 'Professional',
      isEligible: false,
      requirements: [
        { skill: 'Agile Software Development', requiredLevel: 3, userLevel: 1, meetsRequirement: false },
        { skill: 'Applications Development', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Applications Integration', requiredLevel: 3, userLevel: 3, meetsRequirement: true },
        { skill: 'Artificial Intelligence Ethics and Governance', requiredLevel: 3, userLevel: 4, meetsRequirement: true },
        { skill: 'Business Needs Analysis', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Change Management', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Cloud Computing', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Computational Modelling', requiredLevel: 3, userLevel: 3, meetsRequirement: true },
        { skill: 'Computer Vision Technology', requiredLevel: 4, userLevel: 3, meetsRequirement: false },
        { skill: 'Configuration Tracking', requiredLevel: 2, userLevel: 3, meetsRequirement: true },
        { skill: 'Continuous Integration and Continuous Deployment', requiredLevel: 3, userLevel: 1, meetsRequirement: false },
        { skill: 'Cyber and Data Breach Incident Management', requiredLevel: 2, userLevel: 1, meetsRequirement: false },
        { skill: 'Data Analytics', requiredLevel: 2, userLevel: 3, meetsRequirement: true },
        { skill: 'Data Engineering', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Data Ethics', requiredLevel: 3, userLevel: 1, meetsRequirement: false },
        { skill: 'Data Visualisation', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Design Thinking Practice', requiredLevel: 3, userLevel: 1, meetsRequirement: false },
        { skill: 'Intelligent Reasoning', requiredLevel: 4, userLevel: 1, meetsRequirement: false },
        { skill: 'Pattern Recognition Systems', requiredLevel: 4, userLevel: 1, meetsRequirement: false },
        { skill: 'Research', requiredLevel: 3, userLevel: 1, meetsRequirement: false },
        { skill: 'Security Architecture', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Self Learning Systems', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Software Configuration', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Software Design', requiredLevel: 3, userLevel: 4, meetsRequirement: true },
        { skill: 'Software Testing', requiredLevel: 2, userLevel: 3, meetsRequirement: true },
        { skill: 'Stakeholder Management', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'System Integration', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Test Planning', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Text Analytics and Processing', requiredLevel: 4, userLevel: 1, meetsRequirement: false },
        { skill: 'Machine Learning', requiredLevel: 4, userLevel: 0, meetsRequirement: false }, // Not in your proficiencies, default to 0
        { skill: 'Programming', requiredLevel: 3, userLevel: 0, meetsRequirement: false }, // Not in your proficiencies, default to 0
      ],
      missingSkills: [],
      description: 'Develop machine learning models with strong programming and engineering skills.',
      recommendedResources: [
        { title: 'Agile Software Development Guide', url: 'https://example.com/agile' },
        { title: 'Applications Development Guide', url: 'https://example.com/app-dev' },
        { title: 'Applications Integration Tutorial', url: 'https://example.com/app-integration' },
        { title: 'AI Ethics Course', url: 'https://example.com/ai-ethics' },
        { title: 'Business Needs Analysis Guide', url: 'https://example.com/business-needs' },
        { title: 'Change Management Basics', url: 'https://example.com/change-management' },
        { title: 'Cloud Computing Basics', url: 'https://example.com/cloud-computing' },
        { title: 'Computational Modelling Intro', url: 'https://example.com/computational-modelling' },
        { title: 'Computer Vision Course', url: 'https://example.com/computer-vision' },
        { title: 'Configuration Tracking Basics', url: 'https://example.com/config-tracking' },
        { title: 'CI/CD Fundamentals', url: 'https://example.com/ci-cd' },
        { title: 'Cyber Security Fundamentals', url: 'https://example.com/cyber-security' },
        { title: 'Data Analytics Basics', url: 'https://example.com/data-analytics' },
        { title: 'Data Engineering for ML', url: 'https://example.com/data-eng-ml' },
        { title: 'Data Ethics Advanced', url: 'https://example.com/data-ethics-advanced' },
        { title: 'Data Visualisation Tools', url: 'https://example.com/visualisation-tools' },
        { title: 'Design Thinking Course', url: 'https://example.com/design-thinking' },
        { title: 'Intelligent Reasoning Basics', url: 'https://example.com/intelligent-reasoning' },
        { title: 'Pattern Recognition Systems Course', url: 'https://example.com/pattern-recognition' },
        { title: 'Research Methods', url: 'https://example.com/research-methods' },
        { title: 'Security Architecture Guide', url: 'https://example.com/security-architecture' },
        { title: 'Self Learning Systems Intro', url: 'https://example.com/self-learning' },
        { title: 'Software Configuration Guide', url: 'https://example.com/software-config' },
        { title: 'Software Design Principles', url: 'https://example.com/software-design' },
        { title: 'Software Testing Tutorial', url: 'https://example.com/software-testing' },
        { title: 'Stakeholder Management Guide', url: 'https://example.com/stakeholder-management' },
        { title: 'System Integration Basics', url: 'https://example.com/system-integration' },
        { title: 'Test Planning Basics', url: 'https://example.com/test-planning' },
        { title: 'Text Analytics Course', url: 'https://example.com/text-analytics' },
        { title: 'Machine Learning with Python', url: 'https://example.com/ml-python' },
        { title: 'Programming in Python', url: 'https://example.com/python-programming' },
      ],
    },
    appliedDataAIResearcher: {
      role: 'Applied Data/AI Researcher',
      level: 'Professional',
      isEligible: false,
      requirements: [
        { skill: 'Artificial Intelligence Ethics and Governance', requiredLevel: 3, userLevel: 4, meetsRequirement: true },
        { skill: 'Business Needs Analysis', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Computer Vision Technology', requiredLevel: 4, userLevel: 3, meetsRequirement: false },
        { skill: 'Cyber and Data Breach Incident Management', requiredLevel: 2, userLevel: 1, meetsRequirement: false },
        { skill: 'Data Analytics', requiredLevel: 2, userLevel: 3, meetsRequirement: true },
        { skill: 'Data Ethics', requiredLevel: 3, userLevel: 1, meetsRequirement: false },
        { skill: 'Data Visualisation', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Design Thinking Practice', requiredLevel: 3, userLevel: 1, meetsRequirement: false },
        { skill: 'Intelligent Reasoning', requiredLevel: 4, userLevel: 1, meetsRequirement: false },
        { skill: 'Pattern Recognition Systems', requiredLevel: 4, userLevel: 1, meetsRequirement: false },
        { skill: 'Research', requiredLevel: 3, userLevel: 1, meetsRequirement: false },
        { skill: 'Self Learning Systems', requiredLevel: 3, userLevel: 2, meetsRequirement: false },
        { skill: 'Software Configuration', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Software Testing', requiredLevel: 2, userLevel: 3, meetsRequirement: true },
        { skill: 'Stakeholder Management', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Test Planning', requiredLevel: 2, userLevel: 2, meetsRequirement: true },
        { skill: 'Text Analytics and Processing', requiredLevel: 4, userLevel: 1, meetsRequirement: false },
      ],
      missingSkills: [],
      description: 'Conduct cutting-edge research in AI, focusing on computer vision and reasoning.',
      recommendedResources: [
        { title: 'AI Ethics Course', url: 'https://example.com/ai-ethics' },
        { title: 'Business Needs Analysis Guide', url: 'https://example.com/business-needs' },
        { title: 'Computer Vision Course', url: 'https://example.com/computer-vision' },
        { title: 'Cyber Security Fundamentals', url: 'https://example.com/cyber-security' },
        { title: 'Data Analytics Basics', url: 'https://example.com/data-analytics' },
        { title: 'Data Ethics Advanced', url: 'https://example.com/data-ethics-advanced' },
        { title: 'Data Visualisation Tools', url: 'https://example.com/visualisation-tools' },
        { title: 'Design Thinking Course', url: 'https://example.com/design-thinking' },
        { title: 'Intelligent Reasoning Basics', url: 'https://example.com/intelligent-reasoning' },
        { title: 'Pattern Recognition Systems Course', url: 'https://example.com/pattern-recognition' },
        { title: 'Research Methods', url: 'https://example.com/research-methods' },
        { title: 'Self Learning Systems Intro', url: 'https://example.com/self-learning' },
        { title: 'Software Configuration Guide', url: 'https://example.com/software-config' },
        { title: 'Software Testing Tutorial', url: 'https://example.com/software-testing' },
        { title: 'Stakeholder Management Guide', url: 'https://example.com/stakeholder-management' },
        { title: 'Test Planning Basics', url: 'https://example.com/test-planning' },
        { title: 'Text Analytics Course', url: 'https://example.com/text-analytics' },
      ],
    },
  };

  error: string | null = null;
  isPathwayLoaded: boolean = false;
  selectedRole: RolePathway | null = null;
  currentRoleKey: keyof Pathway | null = null;
  nextRoleKey: keyof Pathway | null = null;
  selectedNode: TreeNode | null = null;
  chartData: TreeNode[] = [];
  recommendations: Recommendation[] = [];

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
          associateDataAnalyst: this.pathway.associateDataAnalyst,
          dataAnalyst: this.pathway.dataAnalyst,
          associateDataEngineer: this.pathway.associateDataEngineer,
          businessIntelligenceAnalyst: this.pathway.businessIntelligenceAnalyst,
          dataEngineer: this.pathway.dataEngineer,
          machineLearningEngineer: this.pathway.machineLearningEngineer,
          appliedDataAIResearcher: this.pathway.appliedDataAIResearcher,
        };

        pathwayData.forEach((role: RolePathway) => {
          const key = role.role
            .replace(/\s+/g, '')
            .toLowerCase() as keyof Pathway;
          pathway[key] = { ...this.pathway[key], ...role };
        });

        this.pathway = pathway;
        this.isPathwayLoaded = true;

        // Update missing skills based on requirements
        Object.values(this.pathway).forEach(role => {
          role.missingSkills = role.requirements
            .filter((req: { meetsRequirement: any; }) => !req.meetsRequirement)
            .map((req: { skill: any; requiredLevel: any; userLevel: any; }) => ({ skill: req.skill, requiredLevel: req.requiredLevel, userLevel: req.userLevel }));
        });

        // Determine the user's current role and next role
        this.determineCurrentAndNextRole();

        // Build the hierarchical chart data
        this.buildChartData();

        // Generate recommendations
        this.generateRecommendations();

        // Set the selected node to the current role by default
        if (this.currentRoleKey) {
          this.selectedNode = this.chartData.find(node => node.data?.key === this.currentRoleKey) || null;
          this.selectedRole = this.pathway[this.currentRoleKey];
        }

        console.log('Loaded pathway:', this.pathway);
      },
      error: (err) => {
        console.error('Error loading career pathway:', err);
        this.toast.error('Failed to load career pathway.');
        this.error = 'Failed to load career pathway.';
      },
    });
  }

  // Determine the user's current role and next role in the pathway
  determineCurrentAndNextRole(): void {
    const roleHierarchy: { roleKey: keyof Pathway; level: string }[] = [
      { roleKey: 'associateDataAnalyst', level: 'Associate' },
      { roleKey: 'dataAnalyst', level: 'Senior Associate' },
      { roleKey: 'businessIntelligenceAnalyst', level: 'Professional' },
      { roleKey: 'associateDataEngineer', level: 'Senior Associate' },
      { roleKey: 'dataEngineer', level: 'Professional' },
      { roleKey: 'machineLearningEngineer', level: 'Professional' },
      { roleKey: 'appliedDataAIResearcher', level: 'Professional' },
    ];

    // Find the highest role the user is eligible for
    let currentRole: keyof Pathway | null = null;
    for (const role of roleHierarchy) {
      if (this.pathway[role.roleKey].isEligible) {
        currentRole = role.roleKey;
      }
    }

    // If no role is eligible, assume the user starts at the entry-level role
    this.currentRoleKey = currentRole || 'associateDataAnalyst';

    // Find the next role in the pathway
    if (this.currentRoleKey) {
      const currentIndex = roleHierarchy.findIndex((r) => r.roleKey === this.currentRoleKey);
      if (currentIndex !== -1 && currentIndex < roleHierarchy.length - 1) {
        this.nextRoleKey = roleHierarchy[currentIndex + 1].roleKey;
      }
    }
  }

  // Build a hierarchical chart data array
  buildChartData(): void {
    this.chartData = [
      {
        label: this.pathway.associateDataAnalyst.role,
        data: { key: 'associateDataAnalyst', ...this.pathway.associateDataAnalyst },
        children: [
          { label: this.pathway.dataAnalyst.role, data: { key: 'dataAnalyst', ...this.pathway.dataAnalyst }, children: [] },
          { label: this.pathway.businessIntelligenceAnalyst.role, data: { key: 'businessIntelligenceAnalyst', ...this.pathway.businessIntelligenceAnalyst }, children: [] },
        ],
      },
      {
        label: this.pathway.associateDataEngineer.role,
        data: { key: 'associateDataEngineer', ...this.pathway.associateDataEngineer },
        children: [
          { label: this.pathway.dataEngineer.role, data: { key: 'dataEngineer', ...this.pathway.dataEngineer }, children: [] },
          { label: this.pathway.machineLearningEngineer.role, data: { key: 'machineLearningEngineer', ...this.pathway.machineLearningEngineer }, children: [] },
          { label: this.pathway.appliedDataAIResearcher.role, data: { key: 'appliedDataAIResearcher', ...this.pathway.appliedDataAIResearcher }, children: [] },
        ],
      },
    ];
  }

  // Generate recommendations based on missing skills and next role
  generateRecommendations(): void {
    this.recommendations = [];
    if (this.selectedRole && this.selectedRole.missingSkills.length > 0) {
      this.selectedRole.missingSkills.forEach(skill => {
        this.recommendations.push({
          skill: skill.skill,
          action: `Improve ${skill.skill} from level ${skill.userLevel} to ${skill.requiredLevel}.`,
          resource: this.selectedRole?.recommendedResources?.find(r => r.title.toLowerCase().includes(skill.skill.toLowerCase()))?.url,
        });
      });
    }
    if (this.nextRoleKey && this.pathway[this.nextRoleKey]) {
      const nextRole = this.pathway[this.nextRoleKey];
      nextRole.requirements.forEach(req => {
        if (!req.meetsRequirement && !this.recommendations.some(r => r.skill === req.skill)) {
          this.recommendations.push({
            skill: req.skill,
            action: `Prepare for ${nextRole.role} by learning ${req.skill} (required level: ${req.requiredLevel}).`,
            resource: nextRole.recommendedResources?.find(r => r.title.toLowerCase().includes(req.skill.toLowerCase()))?.url,
          });
        }
      });
    }
  }

  // Calculate overall progress across all roles
  calculateOverallProgress(): number {
    const totalRoles = Object.keys(this.pathway).length;
    const completedSkills = Object.values(this.pathway).reduce((sum, role) => {
      return sum + (role.requirements.length - role.missingSkills.length);
    }, 0);
    const totalSkills = Object.values(this.pathway).reduce((sum, role) => sum + role.requirements.length, 0);
    return totalSkills > 0 ? (completedSkills / totalSkills) * 100 : 0;
  }

  // Get the CSS class for a node based on its status
  getNodeClass(node: TreeNode): string {
    const roleKey = node.data?.key as keyof Pathway;
    if (!roleKey) return '';
    const role = this.pathway[roleKey];
    let classes = 'p-organizationchart-node-content custom-node';
    if (role.isEligible) classes += ' eligible';
    else if (role.missingSkills.length > 0) classes += ' partially-eligible';
    else classes += ' not-eligible';
    if (roleKey === this.currentRoleKey) classes += ' current-role';
    if (roleKey === this.nextRoleKey) classes += ' next-role';
    return classes;
  }

  // Handle node selection
  onNodeSelect(event: any): void {
    const roleKey = event.node.data?.key as keyof Pathway;
    if (roleKey) {
      this.selectedRole = this.pathway[roleKey];
      this.generateRecommendations();
    }
  }
}
