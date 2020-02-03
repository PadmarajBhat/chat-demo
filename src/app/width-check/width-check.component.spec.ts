import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidthCheckComponent } from './width-check.component';

describe('WidthCheckComponent', () => {
  let component: WidthCheckComponent;
  let fixture: ComponentFixture<WidthCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidthCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidthCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
