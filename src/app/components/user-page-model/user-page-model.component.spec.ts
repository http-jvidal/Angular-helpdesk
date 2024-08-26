import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageModelComponent } from './user-page-model.component';

describe('UserPageModelComponent', () => {
  let component: UserPageModelComponent;
  let fixture: ComponentFixture<UserPageModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPageModelComponent]
    });
    fixture = TestBed.createComponent(UserPageModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
