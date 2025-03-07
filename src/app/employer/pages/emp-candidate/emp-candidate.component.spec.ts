import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpCandidateComponent } from './emp-candidate.component';

describe('EmpCandidateComponent', () => {
  let component: EmpCandidateComponent;
  let fixture: ComponentFixture<EmpCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpCandidateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
