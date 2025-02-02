import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerRecommendationComponent } from './seeker-recommendation.component';

describe('SeekerRecommendationComponent', () => {
  let component: SeekerRecommendationComponent;
  let fixture: ComponentFixture<SeekerRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerRecommendationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeekerRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
