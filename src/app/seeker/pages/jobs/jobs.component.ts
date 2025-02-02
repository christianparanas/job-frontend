import { Component, OnInit } from '@angular/core';
import { JobService } from '../../shared/services/job.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobs',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent implements OnInit {
  jobs: any = [];
  isLoading = false;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    // this.jobService.getJobs().subscribe(
    //   (response) => {
    //     this.jobs = response.jobs;
    //     this.isLoading = false;
    //   },
    //   (error) => {
    //     console.error('Error fetching jobs:', error);
    //     this.isLoading = false;
    //   }
    // );
  }
}
