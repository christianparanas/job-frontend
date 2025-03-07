import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpChatComponent } from './emp-chat.component';

describe('EmpChatComponent', () => {
  let component: EmpChatComponent;
  let fixture: ComponentFixture<EmpChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
