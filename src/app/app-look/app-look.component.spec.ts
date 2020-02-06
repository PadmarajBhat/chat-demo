import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLookComponent } from './app-look.component';

describe('AppLookComponent', () => {
  let component: AppLookComponent;
  let fixture: ComponentFixture<AppLookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
