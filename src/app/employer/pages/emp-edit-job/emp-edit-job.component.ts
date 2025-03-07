import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-emp-edit-job', // Matches your routing
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    DropdownModule,
    CardModule,
    MultiSelectModule,
  ],
  standalone: true,
  templateUrl: './emp-edit-job.component.html',
  styleUrls: ['./emp-edit-job.component.css'],
})
export class EmpEditJobComponent {
  job = {
    title: '',
    description: '',
    requirements: [] as { skill: string; proficiency: number }[], // Array for multiple skills with proficiency
    location: '',
    salary: '',
    type: '',
    status: 'Draft',
  };

  statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Draft', value: 'Draft' },
    { label: 'Closed', value: 'Closed' },
  ];

  typeOptions = [
    { label: 'Full-time', value: 'Full-time' },
    { label: 'Part-time', value: 'Part-time' },
    { label: 'Contract', value: 'Contract' },
    { label: 'Internship', value: 'Internship' },
  ];

  skillOptions = [
    { label: 'Agile Software Development', value: 'Agile Software Development' },
    { label: 'Applications Development', value: 'Applications Development' },
    { label: 'Applications Integration', value: 'Applications Integration' },
    { label: 'Artificial Intelligence Ethics and Governance', value: 'Artificial Intelligence Ethics and Governance' },
    { label: 'Business Environment Analysis', value: 'Business Environment Analysis' },
    { label: 'Business Needs Analysis', value: 'Business Needs Analysis' },
    { label: 'Change Management', value: 'Change Management' },
    { label: 'Cloud Computing', value: 'Cloud Computing' },
    { label: 'Computational Modelling', value: 'Computational Modelling' },
    { label: 'Computer Vision Technology', value: 'Computer Vision Technology' },
    { label: 'Configuration Tracking', value: 'Configuration Tracking' },
    { label: 'Continuous Integration and Continuous Deployment', value: 'Continuous Integration and Continuous Deployment' },
    { label: 'Cyber and Data Breach Incident Management', value: 'Cyber and Data Breach Incident Management' },
    { label: 'Data Analytics', value: 'Data Analytics' },
    { label: 'Data Design', value: 'Data Design' },
    { label: 'Data Engineering', value: 'Data Engineering' },
    { label: 'Data Ethics', value: 'Data Ethics' },
    { label: 'Data Migration', value: 'Data Migration' },
    { label: 'Data Visualisation', value: 'Data Visualisation' },
    { label: 'Database Administration', value: 'Database Administration' },
    { label: 'Design Thinking Practice', value: 'Design Thinking Practice' },
    { label: 'Intelligent Reasoning', value: 'Intelligent Reasoning' },
    { label: 'Pattern Recognition Systems', value: 'Pattern Recognition Systems' },
    { label: 'Research', value: 'Research' },
    { label: 'Security Architecture', value: 'Security Architecture' },
    { label: 'Self-Learning Systems', value: 'Self-Learning Systems' },
    { label: 'Software Configuration', value: 'Software Configuration' },
    { label: 'Software Design', value: 'Software Design' },
    { label: 'Software Testing', value: 'Software Testing' },
    { label: 'Stakeholder Management', value: 'Stakeholder Management' },
    { label: 'System Integration', value: 'System Integration' },
    { label: 'Test Planning', value: 'Test Planning' },
    { label: 'Text Analytics and Processing', value: 'Text Analytics and Processing' },
  ];

  proficiencyOptions = [
    { label: '1 - Basic', value: 1 },
    { label: '2 - Intermediate', value: 2 },
    { label: '3 - Advanced', value: 3 },
    { label: '4 - Expert', value: 4 },
  ];

  selectedSkills: string[] = [];

  constructor(private router: Router) {}

  onSkillsChange(event: any) {
    const currentSkills = this.job.requirements.map(r => r.skill);
    const newSkills = event.value;

    // Add new skills with default proficiency (2)
    newSkills.forEach((skill: string) => {
      if (!currentSkills.includes(skill)) {
        this.job.requirements.push({ skill, proficiency: 2 });
      }
    });

    // Remove deselected skills
    this.job.requirements = this.job.requirements.filter(r => newSkills.includes(r.skill));
  }

  onSubmit() {
    if (!this.job.title || !this.job.description) {
      alert('Title and Description are required.');
      return;
    }

    const newJob = {
      id: Date.now(), // Temporary ID
      title: this.job.title,
      status: this.job.status,
      applications: 0,
      postedDate: new Date().toISOString().split('T')[0],
      description: this.job.description,
      requirements: this.job.requirements, // Multiple skills with proficiency
      location: this.job.location,
      salary: this.job.salary,
      type: this.job.type,
    };
    console.log('New Job Created:', newJob);
    // Add API call here (e.g., this.jobService.createJob(newJob).subscribe(...))
    this.router.navigate(['/employer/jobs', newJob.id]);
  }

  cancel() {
    this.router.navigate(['/employer/jobs']);
  }
}
