import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerBadgesComponent } from './seeker-badges.component';

describe('SeekerBadgesComponent', () => {
  let component: SeekerBadgesComponent;
  let fixture: ComponentFixture<SeekerBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerBadgesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeekerBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
