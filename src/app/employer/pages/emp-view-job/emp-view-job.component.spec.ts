import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpViewJobComponent } from './emp-view-job.component';

describe('EmpViewJobComponent', () => {
  let component: EmpViewJobComponent;
  let fixture: ComponentFixture<EmpViewJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpViewJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpViewJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
