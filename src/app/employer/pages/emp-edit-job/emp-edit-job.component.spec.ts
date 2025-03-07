import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpEditJobComponent } from './emp-edit-job.component';

describe('EmpEditJobComponent', () => {
  let component: EmpEditJobComponent;
  let fixture: ComponentFixture<EmpEditJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpEditJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpEditJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
