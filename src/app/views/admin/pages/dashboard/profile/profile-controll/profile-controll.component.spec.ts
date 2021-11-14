import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileControllComponent } from './profile-controll.component';

describe('ProfileControllComponent', () => {
  let component: ProfileControllComponent;
  let fixture: ComponentFixture<ProfileControllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileControllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileControllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
