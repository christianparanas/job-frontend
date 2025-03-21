import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
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
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-emp-edit-job',
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
export class EmpEditJobComponent implements OnInit {
  job = {
    id: 0,
    title: '',
    description: '',
    requirements: [] as {
      skillId: string;
      label: string;
      proficiency: number;
    }[],
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

  skillOptions: { label: string; value: string }[] = [];
  proficiencyOptions = [
    { label: '1 - Basic', value: 1 },
    { label: '2 - Intermediate', value: 2 },
    { label: '3 - Advanced', value: 3 },
    { label: '4 - Expert', value: 4 },
  ];

  selectedSkills: string[] = [];
  isLoading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobService: JobService,
    private toast: HotToastService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSkillsAndJob();
  }

  async loadSkillsAndJob(): Promise<void> {
    try {
      await this.getSkills(); // Ensure skills are loaded first

      this.route.queryParams.subscribe((params) => {
        const jobId = params['id'];
        if (jobId) {
          this.loadJob(+jobId);
        } else {
          this.toast.error('No job ID provided.');
          this.router.navigate(['/employer/jobs']);
          this.isLoading = false;
        }
      });
    } catch (err) {
      console.error('Error in loadSkillsAndJob:', err);
      this.isLoading = false;
    }
  }

  async getSkills(): Promise<void> {
    try {
      const response = await firstValueFrom(this.jobService.getSkills());
      if (response && Array.isArray(response)) {
        this.skillOptions = response.map((skill) => ({
          label: skill.name,
          value: String(skill.id), // Ensure string
        }));
      } else {
        throw new Error('Invalid skills response');
      }
    } catch (err) {
      console.error('Error fetching skills:', err);
      this.toast.error('Failed to load skills.');
      this.skillOptions = [];
    }
  }

  loadJob(jobId: number) {
    this.jobService.getJob(jobId).subscribe({
      next: (response) => {

        this.job = {
          id: response.id,
          title: response.title || '',
          description: response.description || '',
          requirements:
            response.Skills?.map((req: any) => {
              const skillId = req.id;
              const skill = this.skillOptions.find((s) => s.value == skillId);
              return {
                skillId: skillId,
                label: skill?.label,
                proficiency: req.JobRequirement.proficiency,
              };
            }) || [],
          location: response.location || '',
          salary: response.salary || '',
          type: response.type || '',
          status: response.status || 'Draft',
        };

        // Force change detection
        this.cdr.detectChanges();
        this.isLoading = false;

        this.job.requirements?.forEach((req: any) => {
          this.onSkillsChange(req);
        });
      },
      error: (err) => {
        console.error('Error loading job:', err);
        this.toast.error('Failed to load job details.');
        this.router.navigate(['/employer/jobs']);
        this.isLoading = false;
      },
    });
  }

  onSkillsChange(event: any): void {
    const currentSkillIds = this.job.requirements.map((r) => r.skillId);
    const newSkillIds = event.value;

    // Add new skills
    newSkillIds.forEach((skillId: string) => {
      if (!currentSkillIds.includes(skillId)) {
        const skill = this.skillOptions.find((s) => s.value === skillId);
        if (skill) {
          this.job.requirements.push({
            skillId: skill.value,
            label: skill.label,
            proficiency: event.JobRequirement.proficiency,
          });
        }
      }
    });

    // Remove deselected skills
    this.job.requirements = this.job.requirements.filter((r) =>
      newSkillIds.includes(r.skillId)
    );
    this.cdr.detectChanges(); // Force update after modifying requirements
  }

  onSubmit(): void {
    if (!this.job.title || !this.job.description) {
      this.toast.error('Title and Description are required.');
      return;
    }

    const updatedJob = {
      id: this.job.id,
      title: this.job.title,
      description: this.job.description,
      requirements: this.job.requirements.map((req) => ({
        skillId: req.skillId,
        proficiency: req.proficiency,
      })),
      location: this.job.location,
      salary: this.job.salary,
      type: this.job.type,
      status: this.job.status,
      userId: this.authService.getUser()?.id,
    };

    this.jobService.updateJob(this.job.id, updatedJob).subscribe({
      next: () => {
        this.toast.success('Job updated successfully!');
        this.router.navigate(['/employer/jobs']);
      },
      error: (err) => {
        console.error('Error updating job:', err);
        this.toast.error('Failed to update job.');
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/employer/jobs']);
  }
}
