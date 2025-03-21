import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { AssessmentService } from '../../shared/services/assessment.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/shared/services/auth.service';

interface Question {
  id: number;
  questionText: string;
  options: string[]; // Options for radio buttons
  selectedOption: string | null; // User's selected answer
}

interface SkillLevel {
  skill: string;
  level: number; // Proficiency level (1-4)
}

@Component({
  selector: 'app-assessment',
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    RadioButtonModule,
    PaginatorModule,
  ],
  standalone: true,
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css',
})
export class AssessmentComponent implements OnInit {
  showIntro: boolean = true;
  currentPage: number = 1;
  questions: Question[] = []; // Questions will be static or fetched
  paginatedQuestions: Question[] = [];
  isSubmitting: boolean = false; // Track submission state
  hasTakenAssessment: boolean = false;
  showThankYou: boolean = false;

  constructor(
    private router: Router,
    private assessmentService: AssessmentService,
    private authService: AuthService // Use SeekerAuthService
  ) {
    // Initialize static questions (remove or fetch dynamically later)
    this.questions = Array.from({ length: 33 }, (_, i) => ({
      id: i + 1,
      questionText: this.getQuestionText(i + 1),
      options: this.getQuestionOptions(i + 1),
      selectedOption: null,
    }));
    this.updatePaginatedQuestions();
  }

  ngOnInit(): void {
    this.checkTakenAssessment(); // Check takenAssessment from SeekerAuthService
  }

  // Check if the user has taken the assessment (from SeekerAuthService)
  private checkTakenAssessment(): boolean {
    this.hasTakenAssessment = this.authService.hasTakenAssessment();
    return this.authService.hasTakenAssessment();
  }

  // Start or retake the assessment
  startAssessment(): void {
    if (this.checkTakenAssessment()) {
      const confirmed = confirm('You have already taken this assessment. Would you like to retake it? This will overwrite your previous results.');
      if (!confirmed) return;
    }
    this.showIntro = false;
    this.questions.forEach(q => q.selectedOption = null); // Reset answers
  }

  onPageChange(event: any): void {
    this.currentPage = event.page + 1;
    this.updatePaginatedQuestions();
  }

  updatePaginatedQuestions(): void {
    const startIndex = (this.currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    this.paginatedQuestions = this.questions.slice(startIndex, endIndex);
  }

  // Check if all questions are answered
  allQuestionsAnswered(): boolean {
    return this.questions.every(q => q.selectedOption !== null);
  }

  // Determine if Submit button should be visible
  showSubmitButton(): boolean {
    const isLastPage = this.currentPage === Math.ceil(this.questions.length / 5); // Page 7 for 33 questions (last page has 3)
    return this.allQuestionsAnswered() && isLastPage;
  }

  // Submit answers using AssessmentService, sending only skill and level
  submitAnswers(): void {
    if (this.isSubmitting) return; // Prevent multiple submissions
    this.isSubmitting = true;

    const skillLevels: SkillLevel[] = []; // Array of skill and level pairs
    this.questions.forEach(q => {
      if (q.selectedOption) {
        const level = this.getProficiencyLevel(q.selectedOption, q.options); // Get level (1-4) from option
        const skill = this.getSkillName(q.id - 1); // Get skill name for the question
        if (skill && level) {
          skillLevels.push({ skill, level });
        }
      }
    });

    console.log('Submitting skill levels:', skillLevels); // Log for debugging

    this.assessmentService.submitAnswers(skillLevels).subscribe({
      next: (response) => {
        console.log('Assessment submitted successfully', response);
        alert('Assessment submitted successfully! Your results have been updated.');

        this.authService.updateTakenAssessment(true);
        this.showThankYou = true;
      },
      error: (error) => {
        console.error('Error submitting assessment:', error);
        alert('Error submitting assessment. Please try again.');
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false; // Reset submission state
      },
    });
  }

  returnToDashboard(): void {
    this.router.navigate(['/pathway']); // Adjust the route as needed
  }

  // Helper to get proficiency level (1-4) from selected option
  private getProficiencyLevel(selectedOption: string, options: string[]): number {
    const index = options.indexOf(selectedOption);
    return index !== -1 ? index + 1 : 0; // Convert 0-based index to 1-4 level, default to 0 if not found
  }

  // Helper to get skill name by question index (0-based)
  private getSkillName(index: number): string {
    const skillNames = [
      "Agile Software Development", "Applications Development", "Applications Integration", "Artificial Intelligence Ethics and Governance",
      "Business Environment Analysis", "Business Needs Analysis", "Change Management", "Cloud Computing", "Computational Modelling",
      "Computer Vision Technology", "Configuration Tracking", "Continuous Integration and Continuous Deployment",
      "Cyber and Data Breach Incident Management", "Data Analytics", "Data Design", "Data Engineering", "Data Ethics", "Data Migration",
      "Data Visualisation", "Database Administration", "Design Thinking Practice", "Intelligent Reasoning", "Pattern Recognition Systems",
      "Research", "Security Architecture", "Self-Learning Systems", "Software Configuration", "Software Design", "Software Testing",
      "Stakeholder Management", "System Integration", "Test Planning", "Text Analytics and Processing"
    ];
    return skillNames[index] || '';
  }

  // Helper to get question text (simplified, adjust based on your needs)
  private getQuestionText(questionId: number): string {
    const texts = [
      "How would you contribute to a software project using Agile methodology?",
      "How do you handle coding a new application feature?",
      "How do you integrate a new module into an existing app?",
      "How do you ensure AI compliance in a project?",
      "How do you assess business trends?",
      "How do you identify project requirements?",
      "How do you support a team transition?",
      "How do you handle cloud solutions?",
      "How do you approach algorithm use?",
      "How do you work with vision analytics?",
      "How do you manage software changes?",
      "How do you handle code deployment?",
      "How do you respond to a data breach?",
      "How do you analyze data?",
      "How do you structure data?",
      "How do you process data pipelines?",
      "How do you handle data ethically?",
      "How do you migrate data?",
      "How do you present data?",
      "How do you manage databases?",
      "How do you solve challenges?",
      "How do you handle sensory data?",
      "How do you analyze patterns?",
      "How do you conduct research?",
      "How do you secure systems?",
      "How do you work with learning systems?",
      "How do you configure software?",
      "How do you design software?",
      "How do you test software?",
      "How do you handle stakeholders?",
      "How do you integrate systems?",
      "How do you plan tests?",
      "How do you process text data?",
    ];
    return texts[questionId - 1] || `Question ${questionId}`;
  }

  // Helper to get question options (simplified, adjust based on your needs)
  private getQuestionOptions(questionId: number): string[] {
    const options = [
      ["Follow a fixed plan without iteration", "Assist in iterative development with basic tasks", "Implement adaptive methods for continuous deployment", "Design an entire Agile framework from scratch"],
      ["Struggle with basic syntax", "Write and test simple code with guidance", "Code, test, and refine per security standards", "Build augmented reality apps independently"],
      ["Unsure where to start", "Follow instructions to connect components", "Reconfigure and test integration fully", "Redesign the entire system architecture"],
      ["Unaware of ethics needs", "Identify basic AI ethics principles", "Apply governance frameworks to ensure compliance", "Create new global AI ethics standards"],
      ["Unfamiliar with analysis", "Analyze competitor trends and regulations", "Predict long-term industry shifts", "Design business strategies"],
      ["Struggle to gather info", "Document basic needs with help", "Elicit and analyze stakeholder requirements", "Independently prioritize all business initiatives"],
      ["Unaware of processes", "Follow basic transition steps", "Execute systematic change processes", "Redesign entire organizational models"],
      ["Unfamiliar with cloud tech", "Assist in basic cloud setup", "Implement cloud solutions for performance", "Architect new cloud platforms"],
      ["Unfamiliar with algorithms", "Use basic algorithms with guidance", "Apply algorithms to produce outcomes", "Invent new computational methods"],
      ["Unaware of vision tech", "Assist in basic image processing", "Develop vision algorithms", "Deploy advanced spatial reasoning systems"],
      ["Unfamiliar with tracking", "Verify configuration logs", "Design tracking systems", "Automate all revisions"],
      ["Unaware of CI/CD", "Assist in basic integration", "Manage full CI/CD processes", "Build new CI/CD tools"],
      ["Unaware of incidents", "Detect and report breaches", "Resolve breaches independently", "Design security systems"],
      ["Unfamiliar with analytics", "Use tools for basic insights", "Build predictive models", "Design analytics platforms"],
      ["Unaware of data models", "Assist in basic structuring", "Create data models for business needs", "Invent new database systems"],
      ["Unfamiliar with pipelines", "Use tools for basic data tasks", "Implement full data transformation", "Design new pipeline architectures"],
      ["Unaware of ethics", "Follow basic ethical guidelines", "Apply legal and ethical principles", "Create new ethical standards"],
      ["Unfamiliar with migration", "Assist in basic migration", "Plan and execute data migration", "Invent migration tools"],
      ["Unaware of visualization", "Create basic charts", "Develop dashboards", "Design advanced interactive displays"],
      ["Unfamiliar with databases", "Perform basic backups", "Monitor and troubleshoot performance", "Build new database systems"],
      ["Unaware of design thinking", "Assist in basic ideation", "Guide stakeholders through all phases", "Invent new methodologies"],
      ["Unaware of reasoning", "Assist in basic processing", "Integrate sensory data", "Build advanced reasoning systems"],
      ["Unaware of pattern recognition", "Assist in basic analysis", "Apply recognition techniques", "Develop advanced pattern systems"],
      ["Unfamiliar with research", "Gather basic info", "Research concepts for content", "Publish original theories"],
      ["Unaware of security", "Assist in basic controls", "Design security architectures", "Invent new security protocols"],
      ["Unfamiliar with self-learning", "Assist in basic setup", "Develop reinforcement learning systems", "Create new learning algorithms"],
      ["Unfamiliar with configuration", "Configure with automation tools", "Design configuration systems", "Build new platforms"],
      ["Unaware of design", "Assist in basic specifications", "Create functional designs", "Architect new frameworks"],
      ["Unfamiliar with testing", "Run simple test scenarios", "Design complex test scenarios", "Invent new testing tools"],
      ["Unaware of stakeholder needs", "Communicate effectively with stakeholders", "Negotiate complex agreements", "Redesign organizational goals"],
      ["Unfamiliar with integration", "Assist in basic integration", "Implement interoperability solutions", "Build new integration platforms"],
      ["Unaware of test planning", "Document basic test needs", "Develop a phase test plan", "Create new testing methodologies"],
      ["Unaware of text analytics", "Assist in basic extraction", "Analyze text for themes", "Develop advanced text solutions"],
    ];
    return options[questionId - 1] || ["Option 1", "Option 2", "Option 3", "Option 4"];
  }
}
