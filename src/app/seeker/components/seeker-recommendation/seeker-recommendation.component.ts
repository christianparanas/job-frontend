import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Define an interface for recommendation items
interface RecommendationItem {
  name: string;
  description: string;
}

@Component({
  selector: 'app-seeker-recommendation',
  imports: [CommonModule], // Needed for *ngFor and other Angular directives
  standalone: true,
  templateUrl: './seeker-recommendation.component.html',
  styleUrls: ['./seeker-recommendation.component.css'],
})
export class SeekerRecommendationComponent {
  // Sample arrays for People, Courses, and Companies
  people: RecommendationItem[] = [
    { name: 'Christian Paranas', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing' },
    { name: 'Jane Doe', description: 'Experienced developer with a passion for open-source' },
    { name: 'John Smith', description: 'UI/UX designer specializing in mobile applications' },
  ];

  courses: RecommendationItem[] = [
    { name: 'Agile Fundamentals', description: 'Learn the basics of Agile methodology' },
    { name: 'React Native Basics', description: 'Build mobile apps with React Native' },
    { name: 'Python for Data Science', description: 'Master Python for data analysis' },
  ];

  companies: RecommendationItem[] = [
    { name: 'TechCorp', description: 'Innovative software solutions provider' },
    { name: 'CodeWorks', description: 'Leading firm in web development services' },
    { name: 'DataSync', description: 'Specialists in cloud-based data management' },
  ];
}
