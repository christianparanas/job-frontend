import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

interface Question {
  id: number;
  questionText: string;
  type: 'text' | 'checkbox' | 'radio' | 'dropdown'; // Type of the question
  options?: string[]; // Options for radio/checkbox/dropdown
  answer?: any; // The user's answer
}

@Component({
  selector: 'app-assessment',
  imports: [CommonModule, FormsModule, CardModule, ButtonModule],
  standalone: true,
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css',
})
export class AssessmentComponent {// Array of questions (with different types)
  questions: Question[] = [
    {
      id: 1,
      questionText: 'What is your name?',
      type: 'text',
      answer: ''
    },
    {
      id: 2,
      questionText: 'Select your favorite programming languages:',
      type: 'checkbox',
      options: ['JavaScript', 'Python', 'Java', 'C++'],
      answer: {}
    },
    {
      id: 3,
      questionText: 'What is your primary operating system?',
      type: 'radio',
      options: ['Windows', 'MacOS', 'Linux'],
      answer: ''
    },
    {
      id: 4,
      questionText: 'Choose your preferred IDE:',
      type: 'dropdown',
      options: ['VS Code', 'IntelliJ', 'Sublime Text'],
      answer: ''
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  submitAssessment(): void {
    // Here, you can collect the answers and handle the submission (e.g., send to server)
    console.log(this.questions);
    alert('Assessment submitted');
  }
}
