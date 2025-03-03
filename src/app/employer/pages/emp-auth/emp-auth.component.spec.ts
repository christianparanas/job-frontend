import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAuthComponent } from './emp-auth.component';

describe('EmpAuthComponent', () => {
  let component: EmpAuthComponent;
  let fixture: ComponentFixture<EmpAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
