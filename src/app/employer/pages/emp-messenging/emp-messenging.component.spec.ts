import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpMessengingComponent } from './emp-messenging.component';

describe('EmpMessengingComponent', () => {
  let component: EmpMessengingComponent;
  let fixture: ComponentFixture<EmpMessengingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpMessengingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpMessengingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
