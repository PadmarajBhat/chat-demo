import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationScrollCheckComponent } from './navigation-scroll-check.component';

describe('NavigationScrollCheckComponent', () => {
  let component: NavigationScrollCheckComponent;
  let fixture: ComponentFixture<NavigationScrollCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationScrollCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationScrollCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
