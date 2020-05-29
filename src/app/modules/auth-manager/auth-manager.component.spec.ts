import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthManagerComponent } from './auth-manager.component';

describe('AuthManagerComponent', () => {
  let component: AuthManagerComponent;
  let fixture: ComponentFixture<AuthManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
