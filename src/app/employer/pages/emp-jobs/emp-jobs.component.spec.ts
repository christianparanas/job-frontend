import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpJobsComponent } from './emp-jobs.component';

describe('EmpJobsComponent', () => {
  let component: EmpJobsComponent;
  let fixture: ComponentFixture<EmpJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
