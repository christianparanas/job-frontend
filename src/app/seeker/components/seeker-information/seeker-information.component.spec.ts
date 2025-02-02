import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerInformationComponent } from './seeker-information.component';

describe('SeekerInformationComponent', () => {
  let component: SeekerInformationComponent;
  let fixture: ComponentFixture<SeekerInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeekerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
