import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpCreateJobComponent } from './emp-create-job.component';

describe('EmpCreateJobComponent', () => {
  let component: EmpCreateJobComponent;
  let fixture: ComponentFixture<EmpCreateJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpCreateJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpCreateJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
