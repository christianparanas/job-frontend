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
  roleKey: string;
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
      roleKey: 'associateDataAnalyst',
      level: 'Associate',
      isEligible: false,
      requirements: [
        {
          skill: 'Applications Development',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Artificial Intelligence Ethics and Governance',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Business Needs Analysis',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Configuration Tracking',
          requiredLevel: 1,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Cyber and Data Breach Incident Management',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Analytics',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Engineering',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Ethics',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Visualisation',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Software Testing',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Stakeholder Management',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
      ],
      missingSkills: [],
      description:
        'Entry-level role focused on analyzing and visualizing data ethically, supporting business needs analysis and software testing.',
      recommendedResources: [
        {
          title: 'Applications Development Guide',
          url: 'https://developer.android.com/guide', // Android Developer Guide by Google for app development
        },
        {
          title: 'AI Ethics Course',
          url: 'https://www.coursera.org/learn/ai-ethics', // AI Ethics course on Coursera by the University of Helsinki
        },
        {
          title: 'Business Needs Analysis Guide',
          url: 'https://www.mindtools.com/pages/article/newPPM_05.htm', // Business Needs Analysis guide by MindTools
        },
        {
          title: 'Configuration Tracking Basics',
          url: 'https://www.atlassian.com/git/tutorials/saving-changes/gitignore', // Git Configuration Tracking Basics by Atlassian
        },
        {
          title: 'Cyber Security Fundamentals',
          url: 'https://www.coursera.org/learn/cybersecurity-fundamentals', // Cyber Security Fundamentals course on Coursera by IBM
        },
        {
          title: 'Data Analytics Basics',
          url: 'https://www.coursera.org/learn/data-analytics-basics-for-everyone', // Data Analytics Basics for Everyone on Coursera by IBM
        },
        {
          title: 'Data Engineering Fundamentals',
          url: 'https://www.udemy.com/course/data-engineering-fundamentals/', // Data Engineering Fundamentals course on Udemy
        },
        {
          title: 'Data Ethics Course',
          url: 'https://www.coursera.org/learn/data-ethics', // Data Ethics, AI, and Responsible Innovation on Coursera by the University of Edinburgh
        },
        {
          title: 'Data Visualisation with Tableau',
          url: 'https://www.tableau.com/learn/training', // Official Tableau Training and Tutorials by Tableau
        },
        {
          title: 'Software Testing Tutorial',
          url: 'https://www.guru99.com/software-testing.html', // Software Testing Tutorial by Guru99
        },
        {
          title: 'Stakeholder Management Guide',
          url: 'https://www.pmi.org/learning/library/stakeholder-management-plan-11196', // Stakeholder Management Guide by PMI (Project Management Institute)
        },
      ],
    },
    dataAnalyst: {
      role: 'Data Analyst',
      level: 'Senior Associate',
      roleKey: 'dataAnalyst',
      isEligible: false,
      requirements: [
        {
          skill: 'Applications Development',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Applications Integration',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Artificial Intelligence Ethics and Governance',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Business Needs Analysis',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Configuration Tracking',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Cyber and Data Breach Incident Management',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Analytics',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Engineering',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Ethics',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Visualisation',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Design Thinking Practice',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Software Testing',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Stakeholder Management',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
      ],
      missingSkills: [],
      description:
        'Analyze complex datasets with advanced visualization, ethical considerations, and stakeholder collaboration.',
      recommendedResources: [
        {
          title: 'Applications Development Guide',
          url: 'https://developer.android.com/guide', // Android Developer Guide by Google for app development
        },
        {
          title: 'Applications Integration Tutorial',
          url: 'https://www.redhat.com/en/topics/integration/what-is-application-integration', // Application Integration Tutorial by Red Hat
        },
        {
          title: 'AI Ethics Course',
          url: 'https://www.coursera.org/learn/ai-ethics', // AI Ethics course on Coursera by the University of Helsinki
        },
        {
          title: 'Business Needs Analysis Guide',
          url: 'https://www.mindtools.com/pages/article/newPPM_05.htm', // Business Needs Analysis guide by MindTools
        },
        {
          title: 'Configuration Tracking Basics',
          url: 'https://www.atlassian.com/git/tutorials/saving-changes/gitignore', // Git Configuration Tracking Basics by Atlassian
        },
        {
          title: 'Cyber Security Fundamentals',
          url: 'https://www.coursera.org/learn/cybersecurity-fundamentals', // Cyber Security Fundamentals course on Coursera by IBM
        },
        {
          title: 'Data Analytics Basics',
          url: 'https://www.coursera.org/learn/data-analytics-basics-for-everyone', // Data Analytics Basics for Everyone on Coursera by IBM
        },
        {
          title: 'Data Engineering Fundamentals',
          url: 'https://www.udemy.com/course/data-engineering-fundamentals/', // Data Engineering Fundamentals course on Udemy
        },
        {
          title: 'Data Ethics Advanced',
          url: 'https://www.coursera.org/learn/data-ethics', // Data Ethics, AI, and Responsible Innovation on Coursera by the University of Edinburgh
        },
        {
          title: 'Data Visualisation Mastery',
          url: 'https://www.coursera.org/specializations/data-visualization', // Data Visualization Specialization on Coursera by UC Davis
        },
        {
          title: 'Design Thinking Course',
          url: 'https://www.coursera.org/learn/design-thinking-innovation', // Design Thinking for Innovation on Coursera by the University of Virginia
        },
        {
          title: 'Software Testing Tutorial',
          url: 'https://www.guru99.com/software-testing.html', // Software Testing Tutorial by Guru99
        },
        {
          title: 'Stakeholder Management Guide',
          url: 'https://www.pmi.org/learning/library/stakeholder-management-plan-11196', // Stakeholder Management Guide by PMI (Project Management Institute)
        },
      ],
    },
    associateDataEngineer: {
      role: 'Associate Data Engineer',
      level: 'Senior Associate',
      roleKey: 'associateDataEngineer',
      isEligible: false,
      requirements: [
        {
          skill: 'Applications Development',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Applications Integration',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Artificial Intelligence Ethics and Governance',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Business Needs Analysis',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Cloud Computing',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Configuration Tracking',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Continuous Integration and Continuous Deployment',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Cyber and Data Breach Incident Management',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Design',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Engineering',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Ethics',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Migration',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Visualisation',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Database Administration',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Design Thinking Practice',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Software Configuration',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Software Testing',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Stakeholder Management',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'System Integration',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
      ],
      missingSkills: [],
      description:
        'Build data pipelines using cloud technologies and visualization tools.',
      recommendedResources: [
        {
          title: 'Applications Development Guide',
          url: 'https://developer.android.com/guide', // Android Developer Guide by Google for app development
        },
        {
          title: 'Applications Integration Tutorial',
          url: 'https://www.redhat.com/en/topics/integration/what-is-application-integration', // Application Integration Tutorial by Red Hat
        },
        {
          title: 'AI Ethics Course',
          url: 'https://www.coursera.org/learn/ai-ethics', // AI Ethics course on Coursera by the University of Helsinki
        },
        {
          title: 'Business Needs Analysis Guide',
          url: 'https://www.mindtools.com/pages/article/newPPM_05.htm', // Business Needs Analysis guide by MindTools
        },
        {
          title: 'Cloud Computing Basics',
          url: 'https://aws.amazon.com/what-is-cloud-computing/', // Cloud Computing Basics by AWS
        },
        {
          title: 'Configuration Tracking Basics',
          url: 'https://www.atlassian.com/git/tutorials/saving-changes/gitignore', // Git Configuration Tracking Basics by Atlassian
        },
        {
          title: 'CI/CD Fundamentals',
          url: 'https://www.redhat.com/en/topics/devops/what-is-ci-cd', // CI/CD Fundamentals by Red Hat
        },
        {
          title: 'Cyber Security Fundamentals',
          url: 'https://www.coursera.org/learn/cybersecurity-fundamentals', // Cyber Security Fundamentals course on Coursera by IBM
        },
        {
          title: 'Data Design Principles',
          url: 'https://www.dataversity.net/data-design-principles-for-effective-data-management/', // Data Design Principles by DATAVERSITY
        },
        {
          title: 'Data Engineering Fundamentals',
          url: 'https://www.udemy.com/course/data-engineering-fundamentals/', // Data Engineering Fundamentals course on Udemy
        },
        {
          title: 'Data Ethics Course',
          url: 'https://www.coursera.org/learn/data-ethics', // Data Ethics, AI, and Responsible Innovation on Coursera by the University of Edinburgh
        },
        {
          title: 'Data Migration Strategies',
          url: 'https://aws.amazon.com/cloud-data-migration/strategies/', // Data Migration Strategies by AWS
        },
        {
          title: 'Data Visualisation Intro',
          url: 'https://www.tableau.com/learn/articles/data-visualization', // Introduction to Data Visualization by Tableau
        },
        {
          title: 'Database Administration Basics',
          url: 'https://www.coursera.org/learn/database-management-essentials', // Database Management Essentials on Coursera by the University of Colorado
        },
        {
          title: 'Design Thinking Course',
          url: 'https://www.coursera.org/learn/design-thinking-innovation', // Design Thinking for Innovation on Coursera by the University of Virginia
        },
        {
          title: 'Software Configuration Guide',
          url: 'https://www.oreilly.com/library/view/software-configuration-management/0596007655/', // Software Configuration Management Patterns by O'Reilly (preview available)
        },
        {
          title: 'Software Testing Tutorial',
          url: 'https://www.guru99.com/software-testing.html', // Software Testing Tutorial by Guru99
        },
        {
          title: 'Stakeholder Management Guide',
          url: 'https://www.pmi.org/learning/library/stakeholder-management-plan-11196', // Stakeholder Management Guide by PMI (Project Management Institute)
        },
        {
          title: 'System Integration Basics',
          url: 'https://www.ibm.com/topics/system-integration', // System Integration Basics by IBM
        },
      ],
    },
    businessIntelligenceAnalyst: {
      role: 'Business Intelligence Analyst',
      level: 'Professional',
      roleKey: 'businessIntelligenceAnalyst',
      isEligible: false,
      requirements: [
        {
          skill: 'Artificial Intelligence Ethics and Governance',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Business Environment Analysis',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Business Needs Analysis',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Ethics',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Visualisation',
          requiredLevel: 4,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Design Thinking Practice',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Software Testing',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Stakeholder Management',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Test Planning',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
      ],
      missingSkills: [],
      description:
        'Create actionable business insights using advanced visualization tools.',
      recommendedResources: [
        {
          title: 'AI Ethics Course',
          url: 'https://www.coursera.org/learn/ai-ethics', // AI Ethics course on Coursera by the University of Helsinki
        },
        {
          title: 'Business Environment Analysis Guide',
          url: 'https://www.mindtools.com/pages/article/newTMC_09.htm', // PESTLE Analysis for Business Environment by MindTools
        },
        {
          title: 'Business Needs Analysis Guide',
          url: 'https://www.mindtools.com/pages/article/newPPM_05.htm', // Business Needs Analysis guide by MindTools
        },
        {
          title: 'Data Ethics for Professionals',
          url: 'https://www.coursera.org/learn/data-ethics', // Data Ethics, AI, and Responsible Innovation on Coursera by the University of Edinburgh
        },
        {
          title: 'Power BI for BI Analysts',
          url: 'https://learn.microsoft.com/en-us/power-bi/fundamentals/', // Power BI Fundamentals by Microsoft Learn
        },
        {
          title: 'Design Thinking Course',
          url: 'https://www.coursera.org/learn/design-thinking-innovation', // Design Thinking for Innovation on Coursera by the University of Virginia
        },
        {
          title: 'Software Testing Tutorial',
          url: 'https://www.guru99.com/software-testing.html', // Software Testing Tutorial by Guru99
        },
        {
          title: 'Stakeholder Management Guide',
          url: 'https://www.pmi.org/learning/library/stakeholder-management-plan-11196', // Stakeholder Management Guide by PMI (Project Management Institute)
        },
        {
          title: 'Test Planning Basics',
          url: 'https://www.softwaretestinghelp.com/test-plan-tutorial/', // Test Planning Basics by Software Testing Help
        },
      ],
    },
    dataEngineer: {
      role: 'Data Engineer',
      level: 'Professional',
      roleKey: 'dataEngineer',

      isEligible: false,
      requirements: [
        {
          skill: 'Agile Software Development',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Applications Development',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Applications Integration',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Artificial Intelligence Ethics and Governance',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Business Needs Analysis',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Change Management',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Cloud Computing',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Configuration Tracking',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Continuous Integration and Continuous Deployment',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Cyber and Data Breach Incident Management',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Design',
          requiredLevel: 4,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Engineering',
          requiredLevel: 4,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Ethics',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Migration',
          requiredLevel: 4,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Visualisation',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Database Administration',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Design Thinking Practice',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Security Architecture',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Software Configuration',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Software Testing',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Stakeholder Management',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'System Integration',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Test Planning',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
      ],
      missingSkills: [],
      description:
        'Design scalable data systems using advanced engineering and cloud tools.',
      recommendedResources: [
        {
          title: 'Agile Software Development Guide',
          url: 'https://www.atlassian.com/agile', // Agile Software Development Guide by Atlassian
        },
        {
          title: 'Applications Development Guide',
          url: 'https://developer.android.com/guide', // Android Developer Guide by Google for app development
        },
        {
          title: 'Applications Integration Tutorial',
          url: 'https://www.redhat.com/en/topics/integration/what-is-application-integration', // Application Integration Tutorial by Red Hat
        },
        {
          title: 'AI Ethics Course',
          url: 'https://www.coursera.org/learn/ai-ethics', // AI Ethics course on Coursera by the University of Helsinki
        },
        {
          title: 'Business Needs Analysis Guide',
          url: 'https://www.mindtools.com/pages/article/newPPM_05.htm', // Business Needs Analysis guide by MindTools
        },
        {
          title: 'Change Management Basics',
          url: 'https://www.prosci.com/resources/articles/change-management-101', // Change Management Basics by Prosci
        },
        {
          title: 'AWS Cloud Computing',
          url: 'https://aws.amazon.com/getting-started/fundamentals-core-concepts/', // AWS Cloud Computing Fundamentals by AWS
        },
        {
          title: 'Configuration Tracking Basics',
          url: 'https://www.atlassian.com/git/tutorials/saving-changes/gitignore', // Git Configuration Tracking Basics by Atlassian
        },
        {
          title: 'CI/CD Fundamentals',
          url: 'https://www.redhat.com/en/topics/devops/what-is-ci-cd', // CI/CD Fundamentals by Red Hat
        },
        {
          title: 'Cyber Security Fundamentals',
          url: 'https://www.coursera.org/learn/cybersecurity-fundamentals', // Cyber Security Fundamentals course on Coursera by IBM
        },
        {
          title: 'Data Design Principles',
          url: 'https://www.dataversity.net/data-design-principles-for-effective-data-management/', // Data Design Principles by DATAVERSITY
        },
        {
          title: 'Advanced Data Engineering',
          url: 'https://www.coursera.org/specializations/data-engineering-foundations', // Data Engineering Foundations Specialization on Coursera by IBM (includes advanced topics)
        },
        {
          title: 'Data Ethics Advanced',
          url: 'https://www.coursera.org/learn/data-ethics', // Data Ethics, AI, and Responsible Innovation on Coursera by the University of Edinburgh
        },
        {
          title: 'Data Migration Strategies',
          url: 'https://aws.amazon.com/cloud-data-migration/strategies/', // Data Migration Strategies by AWS
        },
        {
          title: 'Data Visualisation Tools',
          url: 'https://www.tableau.com/learn/articles/best-data-visualization-tools', // Best Data Visualization Tools by Tableau
        },
        {
          title: 'Database Administration Basics',
          url: 'https://www.coursera.org/learn/database-management-essentials', // Database Management Essentials on Coursera by the University of Colorado
        },
        {
          title: 'Design Thinking Course',
          url: 'https://www.coursera.org/learn/design-thinking-innovation', // Design Thinking for Innovation on Coursera by the University of Virginia
        },
        {
          title: 'Software Configuration Guide',
          url: 'https://www.oreilly.com/library/view/software-configuration-management/0596007655/', // Software Configuration Management Patterns by O'Reilly (preview available)
        },
        {
          title: 'Software Testing Tutorial',
          url: 'https://www.guru99.com/software-testing.html', // Software Testing Tutorial by Guru99
        },
        {
          title: 'Stakeholder Management Guide',
          url: 'https://www.pmi.org/learning/library/stakeholder-management-plan-11196', // Stakeholder Management Guide by PMI (Project Management Institute)
        },
        {
          title: 'System Integration Basics',
          url: 'https://www.ibm.com/topics/system-integration', // System Integration Basics by IBM
        },
        {
          title: 'Test Planning Basics',
          url: 'https://www.softwaretestinghelp.com/test-plan-tutorial/', // Test Planning Basics by Software Testing Help
        },
      ],
    },
    machineLearningEngineer: {
      role: 'Machine Learning Engineer',
      level: 'Professional',
      roleKey: 'machineLearningEngineer',

      isEligible: false,
      requirements: [
        {
          skill: 'Agile Software Development',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Applications Development',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Applications Integration',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Artificial Intelligence Ethics and Governance',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Business Needs Analysis',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Change Management',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Cloud Computing',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Computational Modelling',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Computer Vision Technology',
          requiredLevel: 4,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Configuration Tracking',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Continuous Integration and Continuous Deployment',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Cyber and Data Breach Incident Management',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Analytics',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Engineering',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Ethics',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Visualisation',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Design Thinking Practice',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Intelligent Reasoning',
          requiredLevel: 4,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Pattern Recognition Systems',
          requiredLevel: 4,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Research',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Security Architecture',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Self-Learning Systems',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Software Configuration',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Software Design',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Software Testing',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Stakeholder Management',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'System Integration',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Test Planning',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Text Analytics and Processing',
          requiredLevel: 4,
          userLevel: 0,
          meetsRequirement: false,
        },
      ],
      missingSkills: [],
      description:
        'Develop machine learning models with strong programming and engineering skills.',
      recommendedResources: [
        {
          title: 'Agile Software Development Guide',
          url: 'https://www.atlassian.com/agile', // Agile Software Development Guide by Atlassian
        },
        {
          title: 'Applications Development Guide',
          url: 'https://developer.android.com/guide', // Android Developer Guide by Google for app development
        },
        {
          title: 'Applications Integration Tutorial',
          url: 'https://www.redhat.com/en/topics/integration/what-is-application-integration', // Application Integration Tutorial by Red Hat
        },
        {
          title: 'AI Ethics Course',
          url: 'https://www.coursera.org/learn/ai-ethics', // AI Ethics course on Coursera by the University of Helsinki
        },
        {
          title: 'Business Needs Analysis Guide',
          url: 'https://www.mindtools.com/pages/article/newPPM_05.htm', // Business Needs Analysis guide by MindTools
        },
        {
          title: 'Change Management Basics',
          url: 'https://www.prosci.com/resources/articles/change-management-101', // Change Management Basics by Prosci
        },
        {
          title: 'Cloud Computing Basics',
          url: 'https://aws.amazon.com/what-is-cloud-computing/', // Cloud Computing Basics by AWS
        },
        {
          title: 'Computational Modelling Intro',
          url: 'https://www.coursera.org/learn/computational-thinking-modeling-simulation', // Computational Thinking and Modeling on Coursera by UC Davis
        },
        {
          title: 'Computer Vision Course',
          url: 'https://www.coursera.org/learn/computer-vision-basics', // Computer Vision Basics on Coursera by the University at Buffalo
        },
        {
          title: 'Configuration Tracking Basics',
          url: 'https://www.atlassian.com/git/tutorials/saving-changes/gitignore', // Git Configuration Tracking Basics by Atlassian
        },
        {
          title: 'CI/CD Fundamentals',
          url: 'https://www.redhat.com/en/topics/devops/what-is-ci-cd', // CI/CD Fundamentals by Red Hat
        },
        {
          title: 'Cyber Security Fundamentals',
          url: 'https://www.coursera.org/learn/cybersecurity-fundamentals', // Cyber Security Fundamentals course on Coursera by IBM
        },
        {
          title: 'Data Analytics Basics',
          url: 'https://www.coursera.org/learn/data-analytics-basics-for-everyone', // Data Analytics Basics for Everyone on Coursera by IBM
        },
        {
          title: 'Data Engineering for ML',
          url: 'https://www.coursera.org/learn/data-engineering-machine-learning', // Data Engineering for Machine Learning on Coursera by Google Cloud
        },
        {
          title: 'Data Ethics Advanced',
          url: 'https://www.coursera.org/learn/data-ethics', // Data Ethics, AI, and Responsible Innovation on Coursera by the University of Edinburgh
        },
        {
          title: 'Data Visualisation Tools',
          url: 'https://www.tableau.com/learn/articles/best-data-visualization-tools', // Best Data Visualization Tools by Tableau
        },
        {
          title: 'Design Thinking Course',
          url: 'https://www.coursera.org/learn/design-thinking-innovation', // Design Thinking for Innovation on Coursera by the University of Virginia
        },
        {
          title: 'Intelligent Reasoning Basics',
          url: 'https://www.coursera.org/learn/introduction-to-ai', // Introduction to AI (includes reasoning basics) on Coursera by the University of Helsinki
        },
        {
          title: 'Pattern Recognition Systems Course',
          url: 'https://www.coursera.org/learn/pattern-recognition', // Pattern Recognition and Machine Learning on Coursera by the University of Alberta
        },
        {
          title: 'Research Methods',
          url: 'https://www.coursera.org/learn/research-methods', // Research Methods on Coursera by the University of London
        },
        {
          title: 'Security Architecture Guide',
          url: 'https://www.cisecurity.org/insights/blog/security-architecture-101', // Security Architecture Guide by CIS (Center for Internet Security)
        },
        {
          title: 'Self Learning Systems Intro',
          url: 'https://www.coursera.org/learn/self-learning-systems', // Introduction to Self-Learning Systems on Coursera (Note: This is a placeholder; search for updated courses if unavailable)
        },
        {
          title: 'Software Configuration Guide',
          url: 'https://www.oreilly.com/library/view/software-configuration-management/0596007655/', // Software Configuration Management Patterns by O'Reilly (preview available)
        },
        {
          title: 'Software Design Principles',
          url: 'https://www.freecodecamp.org/news/software-design-principles/', // Software Design Principles by freeCodeCamp
        },
        {
          title: 'Software Testing Tutorial',
          url: 'https://www.guru99.com/software-testing.html', // Software Testing Tutorial by Guru99
        },
        {
          title: 'Stakeholder Management Guide',
          url: 'https://www.pmi.org/learning/library/stakeholder-management-plan-11196', // Stakeholder Management Guide by PMI (Project Management Institute)
        },
        {
          title: 'System Integration Basics',
          url: 'https://www.ibm.com/topics/system-integration', // System Integration Basics by IBM
        },
        {
          title: 'Test Planning Basics',
          url: 'https://www.softwaretestinghelp.com/test-plan-tutorial/', // Test Planning Basics by Software Testing Help
        },
        {
          title: 'Text Analytics Course',
          url: 'https://www.coursera.org/learn/text-mining', // Text Mining and Analytics on Coursera by the University of Illinois
        },
        {
          title: 'Machine Learning with Python',
          url: 'https://www.coursera.org/learn/machine-learning-with-python', // Machine Learning with Python on Coursera by IBM
        },
        {
          title: 'Programming in Python',
          url: 'https://www.coursera.org/learn/python-programming-introduction', // Introduction to Programming with Python on Coursera by the University of Michigan
        },
      ],
    },
    appliedDataAIResearcher: {
      role: 'Applied Data/AI Researcher',
      level: 'Professional',
      roleKey: 'appliedDataAIResearcher',

      isEligible: false,
      requirements: [
        {
          skill: 'Artificial Intelligence Ethics and Governance',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Business Needs Analysis',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Computer Vision Technology',
          requiredLevel: 4,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Cyber and Data Breach Incident Management',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Analytics',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Ethics',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Data Visualisation',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Design Thinking Practice',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Intelligent Reasoning',
          requiredLevel: 4,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Pattern Recognition Systems',
          requiredLevel: 4,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Research',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Self Learning Systems',
          requiredLevel: 3,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Software Configuration',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Software Testing',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Stakeholder Management',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Test Planning',
          requiredLevel: 2,
          userLevel: 0,
          meetsRequirement: false,
        },
        {
          skill: 'Text Analytics and Processing',
          requiredLevel: 4,
          userLevel: 0,
          meetsRequirement: false,
        },
      ],
      missingSkills: [],
      description:
        'Conduct cutting-edge research in AI, focusing on computer vision and reasoning.',
      recommendedResources: [
        {
          title: 'AI Ethics Course',
          url: 'https://www.coursera.org/learn/ai-ethics', // AI Ethics course on Coursera by the University of Helsinki
        },
        {
          title: 'Business Needs Analysis Guide',
          url: 'https://www.mindtools.com/pages/article/newPPM_05.htm', // Business Needs Analysis guide by MindTools
        },
        {
          title: 'Computer Vision Course',
          url: 'https://www.coursera.org/learn/computer-vision-basics', // Computer Vision Basics on Coursera by the University at Buffalo
        },
        {
          title: 'Cyber Security Fundamentals',
          url: 'https://www.coursera.org/learn/cybersecurity-fundamentals', // Cyber Security Fundamentals course on Coursera by IBM
        },
        {
          title: 'Data Analytics Basics',
          url: 'https://www.coursera.org/learn/data-analytics-basics-for-everyone', // Data Analytics Basics for Everyone on Coursera by IBM
        },
        {
          title: 'Data Ethics Advanced',
          url: 'https://www.coursera.org/learn/data-ethics', // Data Ethics, AI, and Responsible Innovation on Coursera by the University of Edinburgh
        },
        {
          title: 'Data Visualisation Tools',
          url: 'https://www.tableau.com/learn/articles/best-data-visualization-tools', // Best Data Visualization Tools by Tableau
        },
        {
          title: 'Design Thinking Course',
          url: 'https://www.coursera.org/learn/design-thinking-innovation', // Design Thinking for Innovation on Coursera by the University of Virginia
        },
        {
          title: 'Intelligent Reasoning Basics',
          url: 'https://www.coursera.org/learn/introduction-to-ai', // Introduction to AI (includes reasoning basics) on Coursera by the University of Helsinki
        },
        {
          title: 'Pattern Recognition Systems Course',
          url: 'https://www.coursera.org/learn/pattern-recognition', // Pattern Recognition and Machine Learning on Coursera by the University of Alberta
        },
        {
          title: 'Research Methods',
          url: 'https://www.coursera.org/learn/research-methods', // Research Methods on Coursera by the University of London
        },
        {
          title: 'Self Learning Systems Intro',
          url: 'https://www.coursera.org/learn/self-learning-systems', // Placeholder for a Coursera course on self-learning systems (search for updated courses if unavailable)
        },
        {
          title: 'Software Configuration Guide',
          url: 'https://www.oreilly.com/library/view/software-configuration-management/0596007655/', // Software Configuration Management Patterns by O'Reilly (preview available)
        },
        {
          title: 'Software Testing Tutorial',
          url: 'https://www.guru99.com/software-testing.html', // Software Testing Tutorial by Guru99
        },
        {
          title: 'Stakeholder Management Guide',
          url: 'https://www.pmi.org/learning/library/stakeholder-management-plan-11196', // Stakeholder Management Guide by PMI (Project Management Institute)
        },
        {
          title: 'Test Planning Basics',
          url: 'https://www.softwaretestinghelp.com/test-plan-tutorial/', // Test Planning Basics by Software Testing Help
        },
        {
          title: 'Text Analytics Course',
          url: 'https://www.coursera.org/learn/text-mining', // Text Mining and Analytics on Coursera by the University of Illinois
        },
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

  gwa = 0;

  constructor(
    private http: HttpClient,
    private toast: HotToastService,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.loadCareerPathway();
  }

  getUser() {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.gwa = data.PersonalInformation.gwa;
      },
      error: (err) => {
        console.error('Error loading career pathway:', err);
      },
    });
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
          const Rolekey = role.roleKey as keyof Pathway;
          pathway[Rolekey] = { ...this.pathway[Rolekey], ...role };
        });

        this.pathway = pathway;
        this.isPathwayLoaded = true;

        // Update missing skills based on requirements
        Object.values(pathwayData).forEach((role: any) => {
          role.missingSkills = role.requirements
            .filter((req: { meetsRequirement: any }) => !req.meetsRequirement)
            .map((req: { skill: any; requiredLevel: any; userLevel: any }) => ({
              skill: req.skill,
              requiredLevel: req.requiredLevel,
              userLevel: req.userLevel,
            }));
        });

        // Determine the user's current role and next role
        this.determineCurrentAndNextRole();

        // Build the hierarchical chart data
        this.buildChartData();

        // Generate recommendations
        this.generateRecommendations();

        // Set the selected node to the current role by default
        if (this.currentRoleKey) {
          this.selectedNode =
            this.chartData.find(
              (node) => node.data?.key === this.currentRoleKey
            ) || null;
          this.selectedRole = this.pathway[this.currentRoleKey];
        }
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
      const currentIndex = roleHierarchy.findIndex(
        (r) => r.roleKey === this.currentRoleKey
      );
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
        data: {
          key: 'associateDataAnalyst',
          ...this.pathway.associateDataAnalyst,
        },
        expanded: true,
        children: [
          {
            label: this.pathway.dataAnalyst.role,
            data: { key: 'dataAnalyst', ...this.pathway.dataAnalyst },
            expanded: true,
            children: [
              {
                label: this.pathway.businessIntelligenceAnalyst.role,
                data: {
                  key: 'businessIntelligenceAnalyst',
                  relatedRoles: [
                    'dataEngineer',
                    'machineLearningEngineer',
                    'appliedDataAIResearcher',
                  ],
                  ...this.pathway.businessIntelligenceAnalyst,
                },
                expanded: true,
                children: [],
              },
            ],
          },
          {
            label: this.pathway.associateDataEngineer.role,
            data: {
              key: 'associateDataEngineer',
              ...this.pathway.associateDataEngineer,
            },
            expanded: true,
            children: [
              {
                label: this.pathway.dataEngineer.role,
                data: {
                  key: 'dataEngineer',
                  relatedRoles: [
                    'businessIntelligenceAnalyst',
                    'machineLearningEngineer',
                    'appliedDataAIResearcher',
                  ],
                  ...this.pathway.dataEngineer,
                },
                expanded: true,
                children: [],
              },
              {
                label: this.pathway.machineLearningEngineer.role,
                data: {
                  key: 'machineLearningEngineer',
                  relatedRoles: [
                    'businessIntelligenceAnalyst',
                    'dataEngineer',
                    'appliedDataAIResearcher',
                  ],
                  ...this.pathway.machineLearningEngineer,
                },
                expanded: true,
                children: [],
              },
              {
                label: this.pathway.appliedDataAIResearcher.role,
                data: {
                  key: 'appliedDataAIResearcher',
                  relatedRoles: [
                    'businessIntelligenceAnalyst',
                    'dataEngineer',
                    'machineLearningEngineer',
                  ],
                  ...this.pathway.appliedDataAIResearcher,
                },
                expanded: true,
                children: [],
              },
            ],
          },
        ],
      },
    ];
  }

  // Generate recommendations based on missing skills and next role
  generateRecommendations(): void {
    this.recommendations = [];
    if (this.selectedRole && this.selectedRole.missingSkills.length > 0) {
      this.selectedRole.missingSkills.forEach((skill) => {
        this.recommendations.push({
          skill: skill.skill,
          action: `Improve ${skill.skill} from level ${skill.userLevel} to ${skill.requiredLevel}.`,
          resource: this.selectedRole?.recommendedResources?.find((r) =>
            r.title.toLowerCase().includes(skill.skill.toLowerCase())
          )?.url,
        });
      });
    }
    if (this.nextRoleKey && this.pathway[this.nextRoleKey]) {
      const nextRole = this.pathway[this.nextRoleKey];
      nextRole.requirements.forEach((req) => {
        if (
          !req.meetsRequirement &&
          !this.recommendations.some((r) => r.skill === req.skill)
        ) {
          this.recommendations.push({
            skill: req.skill,
            action: `Prepare for ${nextRole.role} by learning ${req.skill} (required level: ${req.requiredLevel}).`,
            resource: nextRole.recommendedResources?.find((r) =>
              r.title.toLowerCase().includes(req.skill.toLowerCase())
            )?.url,
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
    const totalSkills = Object.values(this.pathway).reduce(
      (sum, role) => sum + role.requirements.length,
      0
    );
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
