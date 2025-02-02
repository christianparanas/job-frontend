import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Job {
  id: number;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  jobExcerpt: string;
  jobDescription: string;
  url: string;
  annualSalaryMin: number;
  annualSalaryMax: number;
  salaryCurrency: string;
  jobGeo: string;
  jobType: string[];
}

interface JobApiResponse {
  apiVersion: string;
  documentationUrl: string;
  jobCount: number;
  jobs: Job[];
}

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'https://jobicy.com/api/v2/remote-jobs?count=20&tag=python';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<JobApiResponse> {
    return this.http.get<JobApiResponse>(this.apiUrl);
  }
}
