import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpApplicantsComponent } from './emp-applicants.component';

describe('EmpApplicantsComponent', () => {
  let component: EmpApplicantsComponent;
  let fixture: ComponentFixture<EmpApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpApplicantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
