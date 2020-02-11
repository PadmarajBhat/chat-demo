import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelocationWiseTrendComponent } from './relocation-wise-trend.component';

describe('RelocationWiseTrendComponent', () => {
  let component: RelocationWiseTrendComponent;
  let fixture: ComponentFixture<RelocationWiseTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelocationWiseTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelocationWiseTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
