import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerAssessmentTableComponent } from './seeker-assessment-table.component';

describe('SeekerAssessmentTableComponent', () => {
  let component: SeekerAssessmentTableComponent;
  let fixture: ComponentFixture<SeekerAssessmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerAssessmentTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeekerAssessmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
