import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollCheckComponent } from './scroll-check.component';

describe('ScrollCheckComponent', () => {
  let component: ScrollCheckComponent;
  let fixture: ComponentFixture<ScrollCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
