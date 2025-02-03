import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekersComponent } from './seekers.component';

describe('SeekersComponent', () => {
  let component: SeekersComponent;
  let fixture: ComponentFixture<SeekersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeekersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
