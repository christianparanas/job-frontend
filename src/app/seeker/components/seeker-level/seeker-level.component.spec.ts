import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerLevelComponent } from './seeker-level.component';

describe('SeekerLevelComponent', () => {
  let component: SeekerLevelComponent;
  let fixture: ComponentFixture<SeekerLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeekerLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
