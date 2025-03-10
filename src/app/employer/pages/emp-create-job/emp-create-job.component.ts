import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { JobService } from '../../shared/services/emp-job.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { AuthService } from '../../../core/shared/services/auth.service';

@Component({
  selector: 'app-emp-create-job', // Matches your routing
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
  templateUrl: './emp-create-job.component.html',
  styleUrls: ['./emp-create-job.component.css'],
})
export class EmpCreateJobComponent implements OnInit {
  job = {
    title: '',
    description: '',
    requirements: [] as { skillId: string; label: string; proficiency: number }[], // Array for multiple skills with proficiency
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
    {
      label: '',
      value: '',
    },
  ];

  proficiencyOptions = [
    { label: '1 - Basic', value: 1 },
    { label: '2 - Intermediate', value: 2 },
    { label: '3 - Advanced', value: 3 },
    { label: '4 - Expert', value: 4 },
  ];

  selectedSkills: string[] = [];

  constructor(
    private router: Router,
    private jobService: JobService,
    private toast: HotToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getSkills();
  }

  getSkills(): void {
    this.jobService.getSkills().subscribe({
      next: (response: any[]) => {
        console.log('Skills response:', response);
        this.skillOptions = response.map((skill) => ({
          label: skill.name, // Use 'name' as label
          value: skill.id, // Use 'id' as value
        }));
      },
      error: (error: any) => {
        console.log('Error fetching skills:', error);
      },
    });
  }

  onSkillsChange(event: any): void {
    const currentSkillIds = this.job.requirements.map(r => r.skillId); // Compare by skillId
    const newSkillIds = event.value; // Array of skill IDs from MultiSelect

    // Add new skills with default proficiency (2)
    newSkillIds.forEach((skillId: string) => {
      if (!currentSkillIds.includes(skillId)) {
        const skill = this.skillOptions.find(s => s.value == skillId);
        if (skill) {
          this.job.requirements.push({
            skillId: skill.value,       // Skill ID
            label: skill.label,
            proficiency: 1     // Skill name for display
          });
        }
      }
    });

    // Remove deselected skills
    this.job.requirements = this.job.requirements.filter(r =>
      newSkillIds.includes(r.skillId)
    );
  }

  onSubmit(): void {
    if (!this.job.title || !this.job.description) {
      this.toast.error('Title and Description are required.');
      return;
    }

    const userId = this.authService.getUser()?.id;

    const newJob = {
      title: this.job.title,
      description: this.job.description,
      requirements: this.job.requirements, // Array of { skillId, proficiency }
      location: this.job.location,
      salary: this.job.salary,
      type: this.job.type,
      status: this.job.status,
      userId
    };

    console.log(newJob);

    this.jobService.createJob(newJob).subscribe({
      next: (response: any) => {
        this.toast.success('Job created successfully!');
        this.router.navigate(['/employer/job/view'], { queryParams: { id: response.id } });
      },
      error: (error: any) => {
        console.error('Error creating job:', error);
        this.toast.error('Failed to create job.');
      },
    });
  }

  cancel() {
    this.router.navigate(['/employer/jobs']);
  }
}
