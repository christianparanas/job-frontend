import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpChatsComponent } from './emp-chats.component';

describe('EmpChatsComponent', () => {
  let component: EmpChatsComponent;
  let fixture: ComponentFixture<EmpChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpChatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
