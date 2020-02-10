import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpmGoogleChartsComponent } from './npm-google-charts.component';

describe('NpmGoogleChartsComponent', () => {
  let component: NpmGoogleChartsComponent;
  let fixture: ComponentFixture<NpmGoogleChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpmGoogleChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpmGoogleChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
