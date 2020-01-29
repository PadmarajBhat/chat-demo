import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitedbyComponent } from './recruitedby.component';

describe('RecruitedbyComponent', () => {
  let component: RecruitedbyComponent;
  let fixture: ComponentFixture<RecruitedbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitedbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitedbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
