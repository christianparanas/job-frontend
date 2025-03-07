import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpJobComponent } from './emp-job.component';

describe('EmpJobComponent', () => {
  let component: EmpJobComponent;
  let fixture: ComponentFixture<EmpJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
