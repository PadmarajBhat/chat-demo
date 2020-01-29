import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmnComponent } from './lmn.component';

describe('LmnComponent', () => {
  let component: LmnComponent;
  let fixture: ComponentFixture<LmnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LmnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
